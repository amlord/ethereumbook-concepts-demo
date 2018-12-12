#!/usr/bin/env node

const inquirer = require('inquirer')
const { generateAndDisplayCSPRN } = require('./src/generateCSPRN')
const { generateAndDisplayPrivateKey } = require('./src/generatePrivateKey')
const { deriveAndDisplayPublicKey } = require('./src/derivePublicKey')
const { deriveAndDisplayEthereumAddress } = require('./src/deriveEthereumAddress')
const { ellipticCurveCheck } = require('./src/ellipticCurveCheck')
const quit = require('./src/quit')


async function execute() {
  const actions = [ 
    {
      name: 'Generate CSPRN (cryptographically secure pseudo-random number)',
      short: 'Generate CSPRN',
      value: 'generateCSPRN'
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
      name: 'Derive Ethereum Address',
      short: 'Derive Ethereum Address',
      value: 'deriveEthereumAddress'
    },
    {
      name: 'Elliptic Curve Check',
      short: 'Elliptic Curve Check',
      value: 'ellipticCurveCheck'
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
      case 'generateCSPRN':
        generateAndDisplayCSPRN()
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
        
      case 'quit':
        quit()
        break
    }

    console.log('\n')
  }
}

execute()
