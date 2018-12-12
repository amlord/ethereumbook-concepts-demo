// cryptographically secure pseudo-random number generator
const csprng = require('csprng')

// handle big numbers in js
const BigNumber = require('bignumber.js')

function generateCSPRN(bits = 256) {
  // generate the random number in hex
  const base16Result = csprng(bits, 16)

  // convert hex number to decimal & binary
  const base10Result = BigNumber(`0x${base16Result}`).toString(10)
  const base2Result = BigNumber(`0x${base16Result}`).toString(2)

  return {
    base16: base16Result,
    base10: base10Result,
    base2: base2Result
  }
}

function generateAndDisplayCSPRN() {
  const generatedCSPRN = generateCSPRN()

  console.log('\n')
  console.log(`> hexadecimal (base16):\n\n${generatedCSPRN.base16}\n\n`)
  console.log(`> decimal (base10):\n\n${generatedCSPRN.base10}\n\n`)
  console.log(`> binary (base2):\n\n${generatedCSPRN.base2}`)
}

module.exports = {
  generateCSPRN,
  generateAndDisplayCSPRN
}
