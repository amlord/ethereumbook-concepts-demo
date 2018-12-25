const { createChecksumFromAddress, validChecksum } = require('./eip55Checksum')

describe('createChecksumFromAddress()', () => {
  const addresses = [
    'D46381EE425712D755819b0b26c878676493d5A5',
    'cb37fE1a570EDdA402DcE89FB59A7ea6e2D51cC1',
    '6A517Fd3a5be723B7a82B870cb98DEe179F5B4fc',
    '3F2aFd6c4927151B753309A95d7a381699fFff9f',
    '85A0a118921Ed3c7Fe320C3CFBf5CF8f54CccAf1',
  ]

  addresses.forEach(address => {
    it(`creates correct checksum for "${address}"`, () => {
      const checksum = createChecksumFromAddress(address.toLowerCase())
      expect(checksum).toBe(address)
    })
  })
})

describe('validChecksum()', () => {
  const checksum = 'D46381EE425712D755819b0b26c878676493d5A5'

  it('returns true for valid checksum', () => {
    expect(validChecksum(checksum)).toBe(true)
  })

  it('returns false for invalid checksum', () => {
    expect(validChecksum(checksum.toLowerCase())).toBe(false)
  })
})
