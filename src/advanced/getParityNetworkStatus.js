const { getNodeStatus } = require('../helpers/parity')
const style = require('../helpers/textStyle')

async function getParityNetworkStatus() {
  const parity1 = await getNodeStatus('parity1:8545')
  const parity2 = await getNodeStatus('parity2:9545')
  const parity3 = await getNodeStatus('parity3:10545')
  let networkStatus

  if (parity1.blockHash === parity2.blockHash && parity2.blockHash === parity3.blockHash) {
    networkStatus = style.primary('In Sync')
  } else {
    networkStatus = style.error('Forked')
  }

  console.log('\n')
  console.log(`> Parity Node Status (${networkStatus}):\n\n`)
  console.table({ parity1, parity2, parity3 })
}

module.exports = {
  getParityNetworkStatus,
}
