const { generateMnemonic, deriveDeterministicWalletSeed } = require('./generateMnemonic')

const randomNumbers = [
  {
    value: '31d6d7eefd7f204c6104da47a8b91692',
    wordCount: 12,
    mnemonic: 'crack repeat wing wife velvet change lottery opera element easy east census',
    passphrase: '',
    seed: 'd8df09d87bdd8c4cac428e3d1fa6b275ba9fdb4b6a4b12945540a99083d94c87bd08f9143cb83fb4c0b3eac7713d17f3e8ad2455dfa1b3971ee1ffb0357ccdff',
  },
  {
    value: '37c50b102d6636907d3525093bcfa8275327d379',
    wordCount: 15,
    mnemonic: 'daughter choose series food gloom else visit pigeon ankle taxi tube exchange crash trust train',
    passphrase: 'secret',
    seed: '3bdf1a8ea39da3fa310d78ce0e067626d52ba6f5fa6ba8fc1879cea6a4a83bd93526b5c62e415555011bd1f346d9edc19c04d6d1c85b98d3731929131fdc19b6',
  },
  {
    value: '01f388f8c3b1a2aae17e4707a1d18351d60f9a78bf889914',
    wordCount: 18,
    mnemonic: 'acid ordinary dilemma manual boss fever magnet similar amateur attend general photo genius snake title valve october pelican',
    passphrase: 'bip39',
    seed: 'd58da35682bb2386ba7617d9ba2fe104afb500729ff47a783b5edcfd287a8b07ce7f4e00027dadc7730ec3e593dc7d6609872e8943ee70502278a4619108436b',
  },
  {
    value: 'd7e0987ef69c6711883008b1f6994e2ae990cf97556c58150af08e4d',
    wordCount: 21,
    mnemonic: 'subject age cabbage unfold shoe match camp absurd rapid regular fatal fiction october guitar front pulse fix portion rotate broken swallow',
    passphrase: '',
    seed: '8950d7ac279549c036d42db9b8dbe79634d1229baf3c5a792bffb27b5d294f299608456a277734a7f9cdd212669be625241c75e0ed143201e3e01f4ddc13b9bc',
  },
  {
    value: '4bede694268fec97c175436ec756b52309c9c2e7ff16ef701ea030a9d9759012',
    wordCount: 24,
    mnemonic: 'episode hundred pink escape yard episode alarm position human deny pull ecology orient thumb paper tissue urge liberty pool genuine outside river doctor frozen',
    passphrase: 'springsteen',
    seed: '05b595dc5ee6da62d7d97bcdb7e8f8b6b4c35092fe1918632b22fecf652a6ecf4a9b6917681fc15192464a52a50c2d933d6b80420b43c40e270276fb0961b333',
  },
]

describe('generateMnemonic()', () => {
  randomNumbers.forEach(randomNumber => {
    it(`creates correct mnemonic for "${randomNumber.value}"`, () => {
      const mnemonic = generateMnemonic(randomNumber.wordCount, Buffer.from(randomNumber.value, 'hex'))
      expect(mnemonic.sentence).toBe(randomNumber.mnemonic)
    })
  })
})

describe('deriveDeterministicWalletSeed()', () => {
  randomNumbers.forEach(randomNumber => {
    it(`creates correct wallet seed for "${randomNumber.value}"`, () => {
      const seed = deriveDeterministicWalletSeed(randomNumber.mnemonic, randomNumber.passphrase)
      expect(seed).toBe(randomNumber.seed)
    })
  })
})
