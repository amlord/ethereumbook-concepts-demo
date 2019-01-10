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
      default: '0xbf83a47dfb126fb831e1f9c3e91c5857f4a56661',
    },
  ])

  const balance = await parity.getAccountBalance(account)

  console.log('\n')
  console.log(`> Account Balance:\n\n${style.primary(balance)}`)
}

module.exports = {
  getAccountBalance,
}
