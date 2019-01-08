const axios = require('axios')

async function getNodeStatus(node = 'parity1:8545') {
  const { data: client } = await axios.post(`http://${node}`, {
    jsonrpc: '2.0',
    method: 'web3_clientVersion',
    params: [],
    id: 67
  })

  const { data: coinbaseAccount } = await axios.post(`http://${node}`, {
    jsonrpc: '2.0',
    method: 'eth_coinbase',
    params: [],
    id: 46
  })

  return {
    clientVersion: client.result,
    adminAccount: coinbaseAccount.result
  }
}

module.exports = {
  getNodeStatus
}
