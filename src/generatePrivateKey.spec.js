const { generatePrivateKey } = require('./generatePrivateKey')

// check private key & devive public key
const secp256k1 = require('secp256k1')

describe('generatePrivateKey()', () => {
  const randomBits = '1100001100111010110000011100100101111101111111101001100010100100001001110001110000010011110011010001001011001100010010000111010011100111011101101010100111100111011010011101111010000011110111010000111000011101110000101110000000011110101110101111101000111011'

  it('generates correct private key', () => {
    expect(generatePrivateKey(randomBits)).toBe('6e287d321060f65915467abbafd2272618160347bee937be01af86bfb15c72fc')
  })

  it('generates valid random private key', () => {
    const privateKey = generatePrivateKey()
    expect(secp256k1.privateKeyVerify(Buffer.from(privateKey, 'hex'))).toBe(true)
  })
})
