// cryptographically secure pseudo-random number generator
const csprng = require('csprng')

// handle big numbers in js (up to 256 bit)
const bigNumber = require('bn-str-256')

function generateCSPRN() {
  // generate the random number in hex
  const base16Result = csprng(256, 16)

  // convert hex number to decimal & binary
  const base10Result = bigNumber.parse(`0x${base16Result}`)
  const base2Result = bigNumber.toBinary(`0x${base16Result}`).substring(2)

  console.log('\n')
  console.log(`> hexadecimal (base16):\n\n${base16Result}\n\n`)
  console.log(`> decimal (base10):\n\n${base10Result}\n\n`)
  console.log(`> binary (base2):\n\n${base2Result}`)
}

module.exports = generateCSPRN
