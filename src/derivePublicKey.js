const style = require('./helpers/textStyle')
const inquirer = require('inquirer')

// generate random private key
const { generatePrivateKey } = require('./generatePrivateKey')

// check private key & devive public key
const secp256k1 = require('secp256k1')

// handle big numbers in js
const BigNumber = require('bignumber.js')

/**
 * Derive Public Key from Private Key
 *
 * @property {Buffer} privateKey - buffer containing private key
 * @property {Boolean} [compressed=false] - flag for type of public key to return (compressed / uncompressed)
 *
 * @returns {String} - Returns a string containing the public key
 */
function derivePublicKey(privateKey, compressed = false) {
  // check private key is valid
  if (!secp256k1.privateKeyVerify(privateKey)) {
    throw Error('Invalid private key')
  }

  return secp256k1.publicKeyCreate(privateKey, compressed).toString('hex')
}

async function deriveAndDisplayPublicKey() {
  // prompt use to enter private key (or use default generated)
  const { privateKey } = await inquirer.prompt([
    {
      type: 'input',
      name: 'privateKey',
      message: 'Private Key',
      default: generatePrivateKey(),
    },
  ])

  // get hex private key & convert to buffer
  const privateKeyBuffer = Buffer.from(privateKey, 'hex')

  try {
    const publicKeyCompressed = derivePublicKey(privateKeyBuffer, true)
    const publicKeyUncompressed = derivePublicKey(privateKeyBuffer, false)

    // check for odd / even value of Y (02 = even, 03 = odd)
    const evenValueY = publicKeyCompressed.substring(0, 2) === '02'

    console.log('\n')
    console.log(`> Derived Public Key: ${style.note(`(hexadecimal, compressed, ${evenValueY ? 'even' : 'odd'} value of Y)`)}\n\n${style.primary(publicKeyCompressed)}\n\n`)
    console.log(`> Derived Public Key (Ethereum): ${style.note('(hexadecimal, uncompressed)')}\n\n${style.primary(publicKeyUncompressed)}\n\n`)

    // remove the prefix (should always be '04' for an uncompressed point)
    const withoutPrefix = publicKeyUncompressed.substring(2)

    // get hex values for x & y points
    const xPoint = withoutPrefix.substring(0, 64)
    const yPoint = withoutPrefix.substring(64)

    console.log(`> Eliptic Curve X Coordinate (decimal):\n\n${style.secondary(BigNumber(`0x${xPoint}`).toString(10))}\n\n`)
    console.log(`> Eliptic Curve Y Coordinate (decimal):\n\n${style.secondary(BigNumber(`0x${yPoint}`).toString(10))}`)
  } catch (error) {
    console.log('\n')
    console.log(`> ${error.message}`)
  }
}

module.exports = {
  derivePublicKey,
  deriveAndDisplayPublicKey,
}
