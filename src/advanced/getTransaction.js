const { getTransactionByHash } = require('../helpers/parity')
const inquirer = require('inquirer')
const style = require('../helpers/textStyle')

async function getTransaction() {
  // prompt user for a transaction hash
  const { transactionHash } = await inquirer.prompt([
    {
      type: 'input',
      name: 'transactionHash',
      message: 'Transaction hash'
    },
  ])
  
  const transaction = await getTransactionByHash(transactionHash)

  console.log('\n')
  console.log('> Transaction:\n')

  if(transaction) {
    console.table(transaction)
  } else {
    console.log(style.error('!!!!! Not Found !!!!!'))
  }
}

module.exports = {
  getTransaction
}
