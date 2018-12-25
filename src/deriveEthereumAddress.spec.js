const { deriveEthereumAddress } = require('./deriveEthereumAddress')

describe('deriveEthereumAddress()', () => {
  const rawUncompressedPublicKey = '04bb8c3fdf081b34202b090d316b923b22b0876dc7f938dd267b88017f930c81d8a067183f26ad464206067d5bec6abea165e11990e31af4d5b4d761624eccf742'

  it('returns correct address', () => {
    // remove prefix & convert to buffer
    const publicKey = Buffer.from(rawUncompressedPublicKey.substring(2), 'hex')

    expect(deriveEthereumAddress(publicKey)).toBe('26fa52d7fd14dfe658f7a6db53c51f6b9e69b510')
  })

  it('throws on non-buffer `publicKey` type', () => {
    expect(() => deriveEthereumAddress(rawUncompressedPublicKey)).toThrow()
  })
})
