
const inquirer = require('inquirer')
const ethTx = require('ethereumjs-tx')
const parity = require('../helpers/parity')
const style = require('../helpers/textStyle')
const { derivePublicKey } = require('../derivePublicKey')
const { deriveEthereumAddress } = require('../deriveEthereumAddress')

const chainId = '0x11'

function getNextNonceFromPrivateKey(privateKey) {
  // derive public key
  const privateKeyBuffer = Buffer.from(privateKey, 'hex')
  const publicKey = derivePublicKey(privateKeyBuffer)

  // derive account address
  const publicKeyWithoutPrefix = publicKey.substring(2)
  const publicKeyBuffer = Buffer.from(publicKeyWithoutPrefix, 'hex')
  const address = deriveEthereumAddress(publicKeyBuffer)

  // return promise for next nonce from address
  return parity.getNextNonce(`0x${address}`)
}

async function createRawSignedTransaction() {
  // prompt user for private key of signing account
  const { privateKey } = await inquirer.prompt([
    {
      type: 'input',
      name: 'privateKey',
      message: 'Private Key of Signing Account',
      default: '6d2591af15523fd28d513ff017e8e4e0d7c8ed612bb8708b703bfc7de415ecfa',
    },
  ])

  // prompt user for address of receiving account
  const { toAddress } = await inquirer.prompt([
    {
      type: 'input',
      name: 'toAddress',
      message: 'Send Funds to Address',
      default: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
    },
  ])

  // prompt user for address of receiving account
  const { value } = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: 'Transfer Amount',
      default: '1000000',
    },
  ])

  const nonce = await getNextNonceFromPrivateKey(privateKey)

  const txData = {
    nonce: nonce || '0x0',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x30000',
    to: toAddress,
    value: `0x${parseInt(value).toString(16)}`,
    data: '', // data not required for funds transfer
    v: chainId, // local Parity cluster chain id
    r: 0,
    s: 0 
  }

  const tx = new ethTx(txData)

  // sign the transaction
  tx.sign(Buffer.from(privateKey, 'hex'))

  // serialise the
  const serializedTx = tx.serialize()
  const rawSignedTx = `0x${serializedTx.toString('hex')}`

  console.log('\n')
  console.log(`> Transaction Data:\n\n`)
  console.log(txData)
  console.log('\n')
  console.log(`> Raw Signed Transaction:\n\n${style.primary(rawSignedTx)}`)
}

module.exports = {
  createRawSignedTransaction,
}
