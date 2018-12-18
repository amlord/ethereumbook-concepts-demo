const style = require('./helpers/textStyle')

// cryptographically secure pseudo-random number generator
const { generateRandomNumber } = require('./generateRandomNumber')

// keccak secure hashing function
const createKeccakHash = require('keccak')

function generatePrivateKey() {
  // generate the random string of bits (larger than 256)
  const randomBits = generateRandomNumber(512)

  // create 256-bit hash using the random bits
  return createKeccakHash('keccak256').update(randomBits.base2).digest('hex')
}

function generateAndDisplayPrivateKey() {
  const privateKey = generatePrivateKey()

  console.log('\n')
  console.log(`${style.header("> Generated Private Key: ")}${style.note("(hexadecimal)")}\n\n${style.primary(privateKey)}`)
}

module.exports = {
  generatePrivateKey,
  generateAndDisplayPrivateKey
}
