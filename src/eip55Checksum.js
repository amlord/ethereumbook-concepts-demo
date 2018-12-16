const style = require('./helpers/textStyle')
const inquirer = require('inquirer')

// derive ethereum address from public key
const { generatePrivateKey } = require('./generatePrivateKey')
const { derivePublicKey } = require('./derivePublicKey')
const { deriveEthereumAddress } = require('./deriveEthereumAddress')

// keccak secure hashing function
const createKeccakHash = require('keccak')

async function createChecksumFromAddress(address) {
  const addressHash = createKeccakHash('keccak256').update(address.toLowerCase()).digest('hex')
  
  const addressArray = address.split('')
  const hashArray = addressHash.split('')

  const checksumArray = addressArray.map((character, index) => {
    return (parseInt(`0x${hashArray[index]}`) > 8)
      ? character.toUpperCase()
      : character.toLowerCase()
  })

  return checksumArray.join('')
}

async function createChecksum() {
  const privateKey = generatePrivateKey()
  const publicKey = derivePublicKey(new Buffer(privateKey, "hex"), false)
  const defaultAddress = deriveEthereumAddress(publicKey.substring(2))

  // prompt use to enter Ethereum Address
  const { address } = await inquirer.prompt([{
    type: 'input',
    name: 'address',
    message: 'Ethereum Address',
    default: defaultAddress
  }])

  const addressHash = createKeccakHash('keccak256').update(address.toLowerCase()).digest('hex')
  const checksum = await createChecksumFromAddress(address)

  console.log('\n')
  console.log(`> Ethereum Address:\n\n${style.secondary(address)}\n\n`)
  console.log(`> Address Hash:\n\n${style.secondary(addressHash)}\n\n`)
  console.log(`> Checksum Address:\n\n${style.primary(checksum)}`)
}

async function validateAddress() {
  // prompt use to enter Ethereum Address
  const { address } = await inquirer.prompt([{
    type: 'input',
    name: 'address',
    message: 'Ethereum Checksum Address'
  }])

  const checksum = await createChecksumFromAddress(address)

  console.log('\n')
  console.log(`> Input Checksum Address:\n\n${style.secondary(address)}\n\n`)
  console.log(`> Actual Checksum Address:\n\n${style.secondary(checksum)}\n\n`)
  console.log(`> Result:\n\n${address === checksum ? style.primary("***** MATCHING CHECKSUM *****") : style.error("!!!!! INVALID CHECKSUM !!!!!")}`)
}

async function eip55Checksum() {
  // choose between create checksum / validate address
  const { choice } = await inquirer.prompt([ {
    type: 'list',
    name: 'choice',
    message: 'Choose an operation:',
    choices: [ 
      {
        name: 'Create Checksum',
        short: 'Create Checksum',
        value: 'createChecksum'
      },
      {
        name: 'Validate Address',
        short: 'Validate Address',
        value: 'validateAddress'
      }
    ],
    filter: val => val
  } ])

  choice === 'createChecksum'
    ? await createChecksum()
    : await validateAddress()
}

module.exports = {
  eip55Checksum
}
