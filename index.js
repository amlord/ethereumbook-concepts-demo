#!/usr/bin/env node

const inquirer = require('inquirer')
const { generateAndDisplayCSPRN } = require('./src/generateCSPRN')
const { generateAndDisplayPrivateKey } = require('./src/generatePrivateKey')
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

      case 'quit':
        quit()
        break
    }

    console.log('\n')
  }
}

execute()
