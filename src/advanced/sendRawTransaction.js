
const inquirer = require('inquirer')
const ethTx = require('ethereumjs-tx')
const parity = require('../helpers/parity')
const style = require('../helpers/textStyle')

async function sendRawTransaction() {
  // prompt user for private key of signing account
  const { rawSignedTx } = await inquirer.prompt([
    {
      type: 'input',
      name: 'rawSignedTx',
      message: 'Raw Signed Transaction',
    },
  ])

  try {
    const transactionHash = await parity.sendRawSignedTransaction(rawSignedTx)

    console.log(`\n> Transaction Hash:\n\n${style.primary(transactionHash)}`)
  } catch(err) {
    console.log(`\n> Transaction Failure:\n\n${style.error(err.message)}`)
  }
}

module.exports = {
  sendRawTransaction,
}
