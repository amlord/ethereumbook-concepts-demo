// nodejs crypto module
const { randomBytes } = require('crypto')

// handle big numbers in js
const BigNumber = require('bignumber.js')

function generateRandomNumber(bits = 256) {
  // generate the random number in hex
  const base16Result = randomBytes(bits / 8).toString('hex')

  // convert hex number to decimal & binary
  const base10Result = BigNumber(`0x${base16Result}`).toString(10)
  const base2Result = BigNumber(`0x${base16Result}`).toString(2)

  return {
    base16: base16Result,
    base10: base10Result,
    base2: base2Result
  }
}

function generateAndDisplayRandomNumber() {
  const randomNumber = generateRandomNumber()

  console.log('\n')
  console.log(`> hexadecimal (base16):\n\n${randomNumber.base16}\n\n`)
  console.log(`> decimal (base10):\n\n${randomNumber.base10}\n\n`)
  console.log(`> binary (base2):\n\n${randomNumber.base2}`)
}

module.exports = {
  generateRandomNumber,
  generateAndDisplayRandomNumber
}
