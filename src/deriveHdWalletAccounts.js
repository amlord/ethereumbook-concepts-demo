const inquirer = require('inquirer')
const style = require('./helpers/textStyle')
const { deriveEthereumAddress } = require('./deriveEthereumAddress')
const { createChecksumFromAddress } = require('./eip55Checksum')
const { deriveDeterministicWalletSeed } = require('./generateMnemonic')

// eliptic curve package for Ethereum (& Bitcoin)
const secp256k1 = require('secp256k1')

// Hierarchical Deterministic (HD) Wallet
const HDKey = require('hdkey')

/**
 * @typedef {Object} WalletAccounts
 * @property {String} path - full HD-wallet path of the account
 * @property {String} address - ethereum account address
 * @property {String} privateKey - private key of the account
 * @property {String} publicKey - public key of the account
 */

/**
 * Derive Hierarchical Deterministic (HD) Wallet for a specific path
 *
 * @property {String} seed - deterministic wallet seed
 * @property {Number|String} [account = 0] - account ID (integer), or string to go further down the tree (i.e. "0'/0" to go 1 level deeper)
 * @property {Number} [child = 0] - child ID (integer) to start from
 * @property {Number} [results = 1] - number of accounts (integer) to return
 *
 * @returns {WalletAccounts[]} - Returns a string containing the accounts
 */
function deriveHdWalletAccounts(seed, account = 0, child = 0, results = 1) {
  const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
  const accounts = []

  const purpose = '44' // BIP-44 (https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
  const coinType = '60' // ETH
  const change = '0' // always '0' for ethereum, as not used

  for (let i = parseInt(child); i < parseInt(child) + parseInt(results); i++) {
    // HD wallet path to account being derived
    const path = `m/${purpose}'/${coinType}'/${account}'/${change}/${i}`

    // derive public & private keys for specified path
    const childkey = hdkey.derive(path)

    // get 'uncompressed' public key & remove first byte 'prefix'
    const uncompressedPublicKeyBuffer = secp256k1.publicKeyConvert(childkey.publicKey, false).slice(1)

    // derive ethereum address from public key
    const address = deriveEthereumAddress(uncompressedPublicKeyBuffer)

    accounts.push({
      path: path,
      address: createChecksumFromAddress(address),
      privateKey: childkey.privateKey.toString('hex'),
      publicKey: childkey.publicKey.toString('hex'),
      publicKeyUncompressed: uncompressedPublicKeyBuffer.toString('hex'),
    })
  }

  return accounts
}

async function deriveAndDisplayHdWalletAccounts() {
  let seed

  // prompt user to enter BIP-39 mnemonic phrase
  const { mnemonic } = await inquirer.prompt([
    {
      type: 'input',
      name: 'mnemonic',
      message: 'BIP39 Mnemonic phrase',
      default: 'toddler ribbon enrich length output session begin scare foot dirt payment frequent',
    },
  ])

  if(!mnemonic) {
    // prompt user to enter BIP-39 seed
    ({ seed } = await inquirer.prompt([
      {
        type: 'input',
        name: 'seed',
        message: 'BIP39 Seed',
        default: 'a33aa0a477d9299fe9cb88e82b3e5b6e37d45a9ae0d133851516984212e4e5533137af755fe9e60e5e9cd1aa5a960ddbdd9690086cc00466c448a93169c9a65f',
      },
    ]))
  }

  if(mnemonic && !seed) {
    // prompt use to enter derived wallet passphrase
    const { passphrase } = await inquirer.prompt([
      {
        type: 'input',
        name: 'passphrase',
        message: 'Derived Wallet Passphrase (optional)',
        default: '',
      },
    ])

    seed = deriveDeterministicWalletSeed(mnemonic, passphrase)
  }

  // prompt user to enter account id number
  const { account } = await inquirer.prompt([
    {
      type: 'input',
      name: 'account',
      message: 'Account ID (integer)',
      default: 0,
    },
  ])

  // prompt user to enter child id number
  const { child } = await inquirer.prompt([
    {
      type: 'input',
      name: 'child',
      message: 'Child ID (integer)',
      default: 0,
    },
  ])

  // prompt user for how many results to return
  const { results } = await inquirer.prompt([
    {
      type: 'input',
      name: 'results',
      message: 'Number of results (integer)',
      default: 5,
    },
  ])

  const accounts = deriveHdWalletAccounts(seed, account, child, results)

  const accountsTable = {}

  // map accounts array to object for 'console.table'
  accounts.forEach(account => {
    accountsTable[account.path] = {
      Address: account.address,
      'Private Key': account.privateKey,
      'Public Key': account.publicKey,
      // 'Public Key (uncompressed)': account.publicKeyUncompressed,
    }
  })

  console.log('\n')
  console.log(`> Derived Ethereum Accounts:\n\n`)
  console.table(accountsTable)
}

module.exports = {
  deriveHdWalletAccounts,
  deriveAndDisplayHdWalletAccounts,
}
