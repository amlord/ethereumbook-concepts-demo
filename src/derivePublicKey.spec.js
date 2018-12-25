const { derivePublicKey } = require('./derivePublicKey')

describe('derivePublicKey()', () => {
  const rawPrivateKey = 'a79a6f665d01c432db81ba3c69aa2afb50d36e1c5b63bc00d2f7e9b717942007'

  describe('returns correct public key', () => {
    it('uncompressed', () => {
      // remove prefix & convert to buffer
      const publicKey = Buffer.from(rawPrivateKey, 'hex')

      expect(derivePublicKey(publicKey, false)).toBe('04bb8c3fdf081b34202b090d316b923b22b0876dc7f938dd267b88017f930c81d8a067183f26ad464206067d5bec6abea165e11990e31af4d5b4d761624eccf742')
    })

    it('compressed', () => {
      // remove prefix & convert to buffer
      const publicKey = Buffer.from(rawPrivateKey, 'hex')

      expect(derivePublicKey(publicKey, true)).toBe('02bb8c3fdf081b34202b090d316b923b22b0876dc7f938dd267b88017f930c81d8')
    })
  })

  it('throws on non-buffer `publicKey` type', () => {
    expect(() => derivePublicKey(rawPrivateKey)).toThrow()
  })
})
