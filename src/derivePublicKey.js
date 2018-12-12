const inquirer = require('inquirer')

// generate random private key
const { generatePrivateKey } = require('./generatePrivateKey')

// check private key & devive public key
const secp256k1 = require('secp256k1')

function derivePublicKey(privateKey) {
  // check private key is valid
  if(!secp256k1.privateKeyVerify(privateKey)) {
    throw Error('Invalid private key')
  }

  return secp256k1.publicKeyCreate(privateKey).toString('hex')
}

async function deriveAndDisplayPublicKey() {
  // prompt use to enter private key (or use default generated)
  const { privateKey } = await inquirer.prompt([{
    type: 'input',
    name: 'privateKey',
    message: 'Private Key',
    default: generatePrivateKey()
  }])
  
  // get hex private key & convert to buffer
  const privateKeyBuffer = new Buffer(privateKey, "hex")

  try {
    const publicKey = derivePublicKey(privateKeyBuffer)

    console.log('\n')
    console.log(`> Private Key (hexadecimal):\n\n${privateKey.toString('hex')}\n\n`)
    console.log(`> Derived Public Key (hexadecimal):\n\n${publicKey}`)
  } catch (error) {
    console.log('\n')
    console.log(`> ${error.message}`)
  }
}

module.exports = {
  derivePublicKey,
  deriveAndDisplayPublicKey
}
