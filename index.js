#!/usr/bin/env node

const inquirer = require('inquirer')
const style = require('./src/helpers/textStyle')

// basic functionality
const { generateAndDisplayRandomNumber } = require('./src/generateRandomNumber')
const { generateAndDisplayPrivateKey } = require('./src/generatePrivateKey')
const { deriveAndDisplayPublicKey } = require('./src/derivePublicKey')
const { deriveAndDisplayEthereumAddress } = require('./src/deriveEthereumAddress')
const { ellipticCurveCheck } = require('./src/ellipticCurveCheck')
const { eip55Checksum } = require('./src/eip55Checksum')
const { generateAndDisplayMnemonic } = require('./src/generateMnemonic')
const { deriveAndDisplayHdWalletAccounts } = require('./src/deriveHdWalletAccounts')

// advanced functionality
const { getParityNetworkStatus } = require('./src/advanced/getParityNetworkStatus')
const { transferFunds } = require('./src/advanced/transferFunds')
const { getTransaction } = require('./src/advanced/getTransaction')
const { getAccountBalance } = require('./src/advanced/getAccountBalance')
const { createRawSignedTransaction } = require('./src/advanced/createRawSignedTransaction')
const { sendRawTransaction } = require('./src/advanced/sendRawTransaction')

// exit
const quit = require('./src/quit')

const nodeVersion = Number(process.version.match(/^v(\d+\.\d+)/)[1])

async function execute() {
  if(nodeVersion < 10) {
    console.log(`\n\n${style.error(`!!!!!  Node v10 or greater required (found ${process.version}) !!!!!`)}\n\n`)
    return
  }

  const actions = [ 
    new inquirer.Separator(style.note('────────────────────────────\n  Basic Functionality')),
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
      name: 'Derive Hierarchical Deterministic (HD) Wallet Accounts (BIP-44)',
      short: 'HD Wallet Accounts',
      value: 'deriveHdWalletAccounts'
    },
    new inquirer.Separator(style.note('────────────────────────────\n  Advanced Functionality (Parity Node Required)')),
    {
      name: 'Get Parity Network Status',
      short: 'Network Status',
      value: 'getParityNetworkStatus'
    },
    {
      name: 'Transfer Funds (from admin account)',
      short: 'Transfer Funds',
      value: 'transferFunds'
    },
    {
      name: 'Get Transaction by Hash',
      short: 'Get Transaction',
      value: 'getTransaction'
    },
    {
      name: 'Get Account Balance',
      short: 'Account Balance',
      value: 'getAccountBalance'
    },
    {
      name: 'Create Raw Signed Transaction (transfer of funds)',
      short: 'Create Raw Transaction',
      value: 'createRawSignedTransaction'
    },
    {
      name: 'Send Raw Transaction to Network',
      short: 'Send Raw Transaction',
      value: 'sendRawTransaction'
    },
    new inquirer.Separator(style.note('────────────────────────────')),
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
      // basic functionality

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

      // advanced functionality (parity cluster required)
      
      case 'getParityNetworkStatus':
        await getParityNetworkStatus()
        break
      
      case 'transferFunds':
        await transferFunds()
        break
    
      case 'getTransaction':
        await getTransaction()
        break
  
      case 'getAccountBalance':
        await getAccountBalance()
        break

      case 'createRawSignedTransaction':
        await createRawSignedTransaction()
        break

      case 'sendRawTransaction':
        await sendRawTransaction()
        break
        
      // quit CLI
      
      case 'quit':
        quit()
        break
    }

    console.log('\n')
  }
}

execute()
