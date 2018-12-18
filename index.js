#!/usr/bin/env node

const inquirer = require('inquirer')
const { generateAndDisplayRandomNumber } = require('./src/generateRandomNumber')
const { generateAndDisplayPrivateKey } = require('./src/generatePrivateKey')
const { deriveAndDisplayPublicKey } = require('./src/derivePublicKey')
const { deriveAndDisplayEthereumAddress } = require('./src/deriveEthereumAddress')
const { ellipticCurveCheck } = require('./src/ellipticCurveCheck')
const { eip55Checksum } = require('./src/eip55Checksum')
const { generateAndDisplayMnemonic } = require('./src/generateMnemonic')
const { deriveAndDisplayHdWalletAccounts } = require('./src/deriveHdWalletAccounts')

const quit = require('./src/quit')


async function execute() {
  const actions = [ 
    {
      name: 'Generate CSPRN (cryptographically secure pseudo-random number)',
      short: 'Generate CSPRN',
      value: 'generateRandomNumber'
    },
    {
      name: 'Generate Private Key',
      short: 'Generate Private Key',
      value: 'generatePrivateKey'
    },
    {
      name: 'Derive Public Key from Private Key',
      short: 'Derive Public Key',
      value: 'derivePublicKey'
    },
    {
      name: 'Elliptic Curve Check',
      short: 'Elliptic Curve Check',
      value: 'ellipticCurveCheck'
    },
    {
      name: 'Derive Ethereum Address',
      short: 'Derive Ethereum Address',
      value: 'deriveEthereumAddress'
    },
    {
      name: 'Ethereum Address Checksum (EIP-55)',
      short: 'EIP-55 Checksum',
      value: 'eip55Checksum'
    },
    {
      name: 'Generate Mnemonic (BIP-39)',
      short: 'Generate Mnemonic',
      value: 'generateMnemonic'
    },
    {
      name: 'Derive Hierachical Deterministic (HD) Wallet Accounts (BIP-44)',
      short: 'HD Wallet Accounts',
      value: 'deriveHdWalletAccounts'
    },
    {
      name: 'Quit',
      short: 'Quit',
      value: 'quit'
    }
  ]

  while (true) {
    const { action } = await inquirer.prompt([ {
      type: 'list',
      name: 'action',
      message: 'What action do you want to perform ?',
      choices: actions,
      filter: val => val
    } ])

    switch (action) {
      case 'generateRandomNumber':
        generateAndDisplayRandomNumber()
        break

      case 'generatePrivateKey':
        generateAndDisplayPrivateKey()
        break

      case 'derivePublicKey':
        await deriveAndDisplayPublicKey()
        break

      case 'deriveEthereumAddress':
        await deriveAndDisplayEthereumAddress()
        break

      case 'ellipticCurveCheck':
        await ellipticCurveCheck()
        break

      case 'eip55Checksum':
        await eip55Checksum()
        break

      case 'generateMnemonic':
        await generateAndDisplayMnemonic()
        break

      case 'deriveHdWalletAccounts':
        await deriveAndDisplayHdWalletAccounts()
        break
        
      case 'quit':
        quit()
        break
    }

    console.log('\n')
  }
}

execute()
