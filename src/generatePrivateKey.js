// cryptographically secure pseudo-random number generator
const { generateCSPRN } = require('./generateCSPRN')

// keccak secure hashing function
const createKeccakHash = require('keccak')

function generatePrivateKey() {
  // generate the random string of bits (larger than 256)
  const randomBits = generateCSPRN(512)

  // create 256-bit hash using the random bits
  return createKeccakHash('keccak256').update(randomBits.base2).digest('hex')
}

function generateAndDisplayPrivateKey() {
  const privateKey = generatePrivateKey()

  console.log('\n')
  console.log(`> Generated Private Key (hexadecimal):\n\n${privateKey}`)
}

module.exports = {
  generatePrivateKey,
  generateAndDisplayPrivateKey
}
