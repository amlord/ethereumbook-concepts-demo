const style = require('./helpers/textStyle')

// cryptographically secure pseudo-random number generator
const { generateRandomNumber } = require('./generateRandomNumber')

// keccak secure hashing function
const createKeccakHash = require('keccak')

/**
 * Generates a private key, either at random or from supplied random number (in bits)
 *
 * @property {Number} [bits=256] - number of bits to generate a random number
 *
 * @returns {String} - Returns private key as hexadecimal string
 */
function generatePrivateKey(randomBits = null) {
  if (randomBits) {
    // create 256-bit hash using the random bits
    return createKeccakHash('keccak256')
      .update(randomBits)
      .digest('hex')
  }

  // generate the random string of bits (needs to be larger than 256)
  const { base2 } = generateRandomNumber(512)

  // recursively call this function
  return generatePrivateKey(base2)
}

function generateAndDisplayPrivateKey() {
  // generate private key
  const privateKey = generatePrivateKey()

  console.log('\n')
  console.log(`${style.header('> Generated Private Key: ')}${style.note('(hexadecimal)')}\n\n${style.primary(privateKey)}`)
}

module.exports = {
  generatePrivateKey,
  generateAndDisplayPrivateKey,
}
