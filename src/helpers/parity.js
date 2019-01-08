const axios = require('axios')

function formatClientVersion(rawClientVersion) {
  const regex = /v[0-9]+.[0-9]+.[0-9]+/g
  const result = rawClientVersion.match(regex)

  return  Array.isArray(result) ? result[0] : 'unknown'
}

async function getNodeStatus(node = 'parity1:8545') {
  // batch request node status data
  const { data: [ client, coinbaseAccount, blockNumber, block ] } = await axios.post(`http://${node}`, [
    // parity client version on node
    {
      jsonrpc: '2.0',
      method: 'web3_clientVersion',
      params: [],
      id: 67
    },
    // node admin account
    {
      jsonrpc: '2.0',
      method: 'eth_coinbase',
      params: [],
      id: 46
    },
    // current latest block number
    {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1
    },
    // latest block hash
    {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [ "latest", false ],
      id: 1
    }
  ])

  return {
    clientVersion: formatClientVersion(client.result),
    adminAccount: coinbaseAccount.result,
    blockNumber: parseInt(blockNumber.result, 16),
    blockHash: block.result.hash || '(pending)'
  }
}

module.exports = {
  getNodeStatus
}
