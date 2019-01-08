const { transferFundsToAccount } = require('../helpers/parity')
const inquirer = require('inquirer')
const style = require('../helpers/textStyle')

async function transferFunds() {
  // prompt user for a transaction hash
  const { toAddress } = await inquirer.prompt([
    {
      type: 'input',
      name: 'toAddress',
      message: 'Send funds to (address)',
      default: '0xd46e8dd67c5d32be8058bb8eb970870f07244567'
    },
  ])

  // prompt user for a transaction hash
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: 'Transfer Amount',
      default: '1000000'
    },
  ])
  const numberValue = parseInt(value)

  if(isNaN(numberValue)) {
    console.log('\n')
    console.log(`> ${style.error('!!!!! Value must be an integer !!!!!')}\n\n`)
    return
  }

  const { transactionHash } = await transferFundsToAccount(toAddress, `0x${numberValue.toString(16)}`)

  console.log('\n')
  console.log(`> Transaction Hash:\n\n${style.primary(transactionHash)}`)
}

module.exports = {
  transferFunds
}
