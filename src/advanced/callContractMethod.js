const parity = require('../helpers/parity')
const style = require('../helpers/textStyle')

async function callContractMethod() {
  const response = await parity.callContractMethod()

  console.log('\n')
  console.log(`> Response:\n\n${style.primary(response)}`)
}

module.exports = {
  callContractMethod,
}
