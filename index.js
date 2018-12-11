#!/usr/bin/env node

const inquirer = require('inquirer')
const generateCSPRN = require('./src/generateCSPRN')
const quit = require('./src/quit')


async function execute() {
  const actions = [ 
    {
      name: 'Generate CSPRN (cryptographically secure pseudo-random number)',
      short: 'Generate CSPRN',
      value: 'generateCSPRN'
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
        await generateCSPRN()
        break

      case 'quit':
        quit()
        break
    }

    console.log('\n')
  }
}

execute()
