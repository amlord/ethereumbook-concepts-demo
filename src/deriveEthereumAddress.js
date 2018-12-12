const inquirer = require('inquirer')

const { derivePublicKey } = require('./derivePublicKey')
const { generatePrivateKey } = require('./generatePrivateKey')

// check private key & devive public key
const secp256k1 = require('secp256k1')

// keccak secure hashing function
const createKeccakHash = require('keccak')

function deriveEthereumAddress(publicKey) {
  // take Keccak-256 hash of public key
  const publicKeyHash = createKeccakHash('keccak256').update(publicKey).digest('hex')
  const publicKeyHashbuffer = Buffer.from(publicKeyHash, 'hex')

  // right-most 20 bytes is the Ethereum address
  const ethereumAddress = publicKeyHashbuffer.slice(-20).toString('hex')

  return ethereumAddress
}

async function deriveAndDisplayEthereumAddress() {
  // choose between public / private key entry
  const { keyType } = await inquirer.prompt([ {
    type: 'list',
    name: 'keyType',
    message: 'Derive Ethereum Address from Key Type:',
    choices: [ 
      {
        name: 'Private Key',
        short: 'Private Key',
        value: 'private'
      },
      {
        name: 'Public Key',
        short: 'Public Key',
        value: 'public'
      }
    ],
    filter: val => val
  } ])

  let privateKey = generatePrivateKey()
  let publicKey = derivePublicKey(new Buffer(privateKey, "hex"))

  if(keyType === 'private') {
    // prompt use to enter private key (or use default generated)
    const response = await inquirer.prompt([{
      type: 'input',
      name: 'privateKey',
      message: 'Private Key',
      default: privateKey
    }])

    privateKey = response.privateKey
    publicKey = derivePublicKey(new Buffer(privateKey, "hex"))
  } else {
    // prompt use to enter private key (or use default generated)
    const response = await inquirer.prompt([{
      type: 'input',
      name: 'publicKey',
      message: 'Public Key',
      default: publicKey
    }])

    privateKey = null
    publicKey = response.publicKey
  }

  const ethereumAddress = deriveEthereumAddress(publicKey)

  console.log('\n')
  console.log(`> Private Key (hexadecimal):\n\n${privateKey ? privateKey : "(UNKNOWN)"}`)

  console.log('\n')
  console.log(`> ${privateKey ? "Derived " : ""}Public Key (hexadecimal):\n\n${publicKey}`)

  console.log('\n')
  console.log(`> Derived Ethereum Address (hexadecimal):\n\n${ethereumAddress}`)
}

module.exports = {
  deriveEthereumAddress,
  deriveAndDisplayEthereumAddress
}
