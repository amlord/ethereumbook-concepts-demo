const axios = require('axios')

function formatClientVersion(rawClientVersion) {
  const regex = /v[0-9]+.[0-9]+.[0-9]+/g
  const result = rawClientVersion.match(regex)

  return Array.isArray(result) ? result[0] : 'unknown'
}

async function getNextNonce(address) {
  const {
    data: { result },
  } = await axios.post('http://parity1:8545', {
    jsonrpc: '2.0',
    method: 'parity_nextNonce',
    params: [ address ],
    id: 1,
  })

  return result
}

async function getNodeStatus(node = 'parity1:8545') {
  // batch request node status data
  const {
    data: [client, coinbaseAccount, blockNumber, block],
  } = await axios.post(`http://${node}`, [
    // parity client version on node
    {
      jsonrpc: '2.0',
      method: 'web3_clientVersion',
      params: [],
      id: 67,
    },
    // node admin account
    {
      jsonrpc: '2.0',
      method: 'eth_coinbase',
      params: [],
      id: 46,
    },
    // current latest block number
    {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    },
    // latest block hash
    {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['latest', false],
      id: 1,
    },
  ])

  return {
    clientVersion: formatClientVersion(client.result),
    adminAccount: coinbaseAccount.result,
    blockNumber: parseInt(blockNumber.result, 16),
    blockHash: block.result.hash || '(pending)',
  }
}

async function transferFundsToAccount(to, value) {
  const adminAddressParity1 = '0x21f641df60fc1d256883e81fea641573c46e1ae9'

  // get the next nonce for this account (from parity)
  const nonce = await getNextNonce(adminAddressParity1)

  const {
    data: { result: transactionHash },
  } = await axios.post('http://parity1:8545', {
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [
      {
        from: adminAddressParity1,
        to,
        gas: '0x76c0', // 30400
        gasPrice: '0x9184e72a000', // 10000000000000
        value,
        nonce
      },
    ],
    id: 1,
  })

  return {
    transactionHash,
  }
}

async function getTransactionByHash(transactionHash) {
  const {
    data: { result: transaction },
  } = await axios.post('http://parity1:8545', {
    jsonrpc: '2.0',
    method: 'eth_getTransactionByHash',
    params: [transactionHash],
    id: 1,
  })

  if (!transaction) {
    return
  }

  return {
    blockHash: transaction.blockHash,
    blockNumber: parseInt(transaction.blockNumber, 16),
    from: transaction.from,
    nonce: parseInt(transaction.nonce, 16),
    value: parseInt(transaction.value, 16),
  }
}

async function getAccountBalance(address) {
  const {
    data: { result: balance },
  } = await axios.post('http://parity1:8545', {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: [address, 'latest'],
    id: 1,
  })

  return parseInt(balance, 16)
}

async function sendRawSignedTransaction(rawSignedTx) {
  const { data } = await axios.post('http://parity1:8545', {
    jsonrpc: '2.0',
    method: 'eth_sendRawTransaction',
    params: [rawSignedTx],
    id: 1,
  })

  if (data.error) {
    throw Error(data.error.message)
  }

  return data.result
}

module.exports = {
  getNodeStatus,
  getTransactionByHash,
  getAccountBalance,
  getNextNonce,
  transferFundsToAccount,
  sendRawSignedTransaction
}
