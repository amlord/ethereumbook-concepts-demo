const parity = require('../helpers/parity')
const inquirer = require('inquirer')
const style = require('../helpers/textStyle')

async function getAccountBalance() {
  // prompt user for an account to check balance of
  const { account } = await inquirer.prompt([
    {
      type: 'input',
      name: 'account',
      message: 'Account Address',
      default: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
    },
  ])

  const balance = await parity.getAccountBalance(account)

  console.log('\n')
  console.log(`> Account Balance:\n\n${style.primary(balance)}`)
}

module.exports = {
  getAccountBalance,
}
