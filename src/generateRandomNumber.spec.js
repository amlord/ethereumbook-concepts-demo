const { generateRandomNumber } = require('./generateRandomNumber')

// handle big numbers in js
const BigNumber = require('bignumber.js')

describe('generateRandomNumber()', () => {
  const bits = 256
  const { base16, base10, base2 } = generateRandomNumber(bits)


  it('creates number less than or equal to specified length (bits)', () => {
    expect(base2.length <= bits).toBe(true)
  })

  it('all results are equal', () => {
    expect(BigNumber(`0x${base16}`).toString(10)).toBe(base10)
    expect(BigNumber(`0x${base16}`).toString(2)).toBe(base2)
  })
})
