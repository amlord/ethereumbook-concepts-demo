// cryptographically secure pseudo-random number generator
const csprng = require('csprng')

// handle big numbers in js (up to 256 bit)
const bigNumber = require('bn-str-256')

function generateCSPRN(bits = 256) {
  // generate the random number in hex
  const base16Result = csprng(bits, 16)

  // convert hex number to decimal & binary
  const base10Result = bigNumber.parse(`0x${base16Result}`)
  const base2Result = bigNumber.toBinary(`0x${base16Result}`).substring(2)

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
