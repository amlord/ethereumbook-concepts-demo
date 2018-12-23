const style = require('./helpers/textStyle')
const inquirer = require('inquirer')

const { derivePublicKey } = require('./derivePublicKey')
const { generatePrivateKey } = require('./generatePrivateKey')

// keccak secure hashing function
const createKeccakHash = require('keccak')

/**
 * Derive Ethereum address from uncompressed Public Key
 * 
 * @property {Buffer} publicKey - buffer containing the uncompressed public key (minus the prefix)
 * 
 * @returns {String} - Returns a string containing the ethereum address
 */
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
  let publicKey = derivePublicKey(Buffer.from(privateKey, "hex"), false)

  if(keyType === 'private') {
    // prompt use to enter private key (or use default generated)
    const response = await inquirer.prompt([{
      type: 'input',
      name: 'privateKey',
      message: 'Private Key',
      default: privateKey
    }])

    privateKey = response.privateKey
    publicKey = derivePublicKey(Buffer.from(privateKey, "hex"), false)
  } else {
    // prompt use to enter uncompressed public key (or use default generated)
    const response = await inquirer.prompt([{
      type: 'input',
      name: 'publicKey',
      message: 'Public Key',
      default: publicKey
    }])

    privateKey = null
    publicKey = response.publicKey
  }

  // remove the prefix (should always be '04' for an uncompressed publicKey)
  const publicKeyWithoutPrefix = publicKey.substring(2)

  const ethereumAddress = deriveEthereumAddress(Buffer.from(publicKeyWithoutPrefix, 'hex'))

  console.log('\n')
  console.log(`> Private Key:\n\n${privateKey ? style.secondary(privateKey) : style.note("(UNKNOWN)")}`)

  console.log('\n')
  console.log(`> ${privateKey ? "Derived " : ""}Public Key: ${style.note("(uncompressed)")}\n\n${style.secondary(publicKey)}`)

  console.log('\n')
  console.log(`> Derived Ethereum Address:\n\n${style.primary(ethereumAddress)}`)
}

module.exports = {
  deriveEthereumAddress,
  deriveAndDisplayEthereumAddress
}
