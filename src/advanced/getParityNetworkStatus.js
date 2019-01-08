const { getNodeStatus } = require('../helpers/parity')

async function getParityNetworkStatus() {
  const parity1 = await getNodeStatus('parity1:8545')
  const parity2 = await getNodeStatus('parity2:9545')
  const parity3 = await getNodeStatus('parity3:10545')

  console.log({ parity1, parity2, parity3 })
}

module.exports = {
  getParityNetworkStatus
}
