const { deriveHdWalletAccounts } = require('./deriveHdWalletAccounts')

describe('deriveHdWalletAccounts()', () => {
  // mnemonic: toilet convince replace enemy sleep vessel similar wreck achieve coin adult report

  describe('where passphrase = ""', () => {
    const seed = 'e016eb59ae7546120885a8d76c5cc227498a0a5833f2eb857112072693f5d3fe789143fbe65e51068326470552cba2a7f005af7df753c1e6d23964ee884f9ab0'

    it("returns correct account from seed @ path: m/44'/60'/0'/0/0", () => {
      const accounts = deriveHdWalletAccounts(seed)

      expect(accounts.length).toBe(1)
      expect(accounts[0]).toMatchObject({
        path: "m/44'/60'/0'/0/0",
        address: '1Baf99ba089042CD85111B0E4b0399cAFf7d95aC',
        privateKey: '6b3f24fa16b3365964c5048376aefda21452c057d9f0e23d612be7dc02e61591',
        publicKey: '0274702cd63b4a724a5b2b170f2b2ad4561f2661ab3c03293ea77ec791606f9123'
      })
    })

    it("returns correct account from seed @ path: m/44'/60'/1'/0/5", () => {
      const account = 1
      const child = 5
      const accounts = deriveHdWalletAccounts(seed, account, child)

      expect(accounts[0]).toMatchObject({
        path: "m/44'/60'/1'/0/5",
        address: '0E40414F31BaB673C56BFd3fBd50839b8d85F23e',
        privateKey: 'fde3a749b49f202a63c07774d88d75e578dfc3364b7aebb421c7c601af5f4b7d',
        publicKey: '025875ba38cfb3840d9c49778f5999209e96c4e1f08444c65b68a67eb0993f20d8'
      })
    })
  })

  describe('where passphrase = "batman"', () => {
    const seed = 'b4daef1ae53fc987766366dbca9097ca91486a81b5a3c7b4ea389c4b2332a6c68ca546dd96a8ea92d1aaeb07e89e6efa70e84fe9ef47c44df87574d06fab118d'

    it("returns correct account from seed @ path: m/44'/60'/0'/0/0", () => {
      const accounts = deriveHdWalletAccounts(seed)

      expect(accounts.length).toBe(1)
      expect(accounts[0]).toMatchObject({
        path: "m/44'/60'/0'/0/0",
        address: 'A3967a4e5D36A06527ae16b664108cB84AC6128A',
        privateKey: '0f07ce7fb2a600ad9586085ebca2e06cc817957adbd7844d825d51f2ce03b7d7',
        publicKey: '03008cf0ba4cc8452fedddf5bf251f120ee8eead9ba52a5f0fac5fe4ad3f92f14d'
      })
    })

    it("returns correct account from seed @ path: m/44'/60'/1'/0/5", () => {
      const account = 1
      const child = 5
      const accounts = deriveHdWalletAccounts(seed, account, child)

      expect(accounts[0]).toMatchObject({
        path: "m/44'/60'/1'/0/5",
        address: '561dD00776D7001309e06e464a35d167ff61CE06',
        privateKey: '0933ede1aec5016b3ce4e1985265d299494ae6892a51ca759eee82467536ba1b',
        publicKey: '03d2a2d4cf34372ce2b6c4dfead9be68aa1c1b2ad4d7bf458fe879837124a753df'
      })
    })
  })

  describe('where "account" is several levels deep', () => {
    const seed = 'e016eb59ae7546120885a8d76c5cc227498a0a5833f2eb857112072693f5d3fe789143fbe65e51068326470552cba2a7f005af7df753c1e6d23964ee884f9ab0'
    const account = "1'/2'/3"
    
    it('returns the correct account', () => {
      const accounts = deriveHdWalletAccounts(seed, account)

      expect(accounts[0]).toMatchObject({
        path: "m/44'/60'/1'/2'/3'/0/0",
        address: '745FAD225cbbc42C81B7DFdd2E3973Ce84cEe71c',
        privateKey: '9bbe4970fac0ca9dd57f34c53b68290519a56d0e98472b540943daff658f09b6',
        publicKey: '037b5bab76703b9e34440b01b71586fcf1a7a3a0fcc4fab943b8193c9332e9b9e2'
      })
    })
  })
})
