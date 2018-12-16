const inquirer = require('inquirer')
const style = require('./helpers/textStyle');

// generate cryptographically-secure random number
const { generateCSPRN } = require('./generateCSPRN.js')

// keccak secure hashing function
const createKeccakHash = require('keccak')

// handle big numbers in js
const BigNumber = require('bignumber.js')

// json map of bbinary value to mnemonic string
const wordlist = require('../wordlists/english-encode.json')

// map mnemonic words to number of entropy & checksum bits
const mnemonicMap = {
  12: {
    entropyBits: 128,
    checksumBits: 4
  },
  15: {
    entropyBits: 160,
    checksumBits: 5
  },
  18: {
    entropyBits: 192,
    checksumBits: 6
  },
  21: {
    entropyBits: 224,
    checksumBits: 7
  },
  24: {
    entropyBits: 256,
    checksumBits: 8
  }
}

/**
 * @typedef {Object} MnemonicDetails
 * @property {String} seed - Seed from which deterministic wallet is generated
 * @property {String} checksum - Checksum value to ensure correct seed
 * @property {String[]} words - An array of strings containing the mnemonic words
 * @property {String} sentence - A single string of concatenated mnemonic words
 */

/**
 * Generate a Mnemomic for a "deterministic wallet" seed
 * 
 * @property {Number} [numberOfWords=12] - length in words of the mnemonic to be generated (12, 15, 18, 21, 24)
 * 
 * @returns {MnemonicDetails} - Returns an object containing the mnemonic, seed & checksum
 */
function generateMnemonic(numberOfWords = 12) {
  // generate a random number (base2), length determined by the entropy required
  const { base2: randomNumber } = generateCSPRN(mnemonicMap[numberOfWords].entropyBits)

  // hash the random numbber
  const randomNumberHash = createKeccakHash('keccak256').update(randomNumber).digest('hex')
  const binaryRandomNumberHash = BigNumber(`0x${randomNumberHash}`).toString(2)

  // convert has to binary & take the leftmost number of checksum required bits
  const checksum = binaryRandomNumberHash.substring(0, mnemonicMap[numberOfWords].checksumBits)

  // get binary keys array for mnemonic words required (split into blocks of 11 bits)
  const mnemonicWordKeys = (randomNumber + checksum).match(/.{1,11}/g)

  // map keys to the mnemonic words
  const mnemonic = mnemonicWordKeys.map(key => wordlist[key])

  return {
    entropyBits: mnemonicMap[numberOfWords].entropyBits,
    randomNumber,
    checksumBits: mnemonicMap[numberOfWords].checksumBits,
    checksum,
    words: mnemonic,
    sentence: mnemonic.join(' ')
  }
}

async function generateAndDisplayMnemonic() {
  // choose mnemonic length to generate
  const { mnemonicLength } = await inquirer.prompt([ {
    type: 'list',
    name: 'mnemonicLength',
    message: 'Mnemonic Length:',
    choices: [ 
      {
        name: '12 words',
        short: '12 words',
        value: 12
      },
      {
        name: '15 words',
        short: '15 words',
        value: 15
      },
      {
        name: '18 words',
        short: '18 words',
        value: 18
      },
      {
        name: '21 words',
        short: '21 words',
        value: 21
      },
      {
        name: '24 words',
        short: '24 words',
        value: 24
      }
    ],
    filter: val => val
  } ])

  const mnemonic = generateMnemonic(mnemonicLength)

  console.log('\n')
  console.log(style.header('> Cryptographically-Secure Random Number: ') + style.note(`(${mnemonic.entropyBits} bits of entropy / ${mnemonic.checksumBits} checksum bits, chcksum: ${mnemonic.checksum})\n`))
  console.log(style.secondary(`${mnemonic.randomNumber}\n\n`))
  console.log(style.header('> Mnemonic: ') + style.note(`(${mnemonicLength} words / ${mnemonic.entropyBits} bits of entropy / ${mnemonic.checksumBits} checksum bits)\n`))
  console.log(`${style.primary(mnemonic.sentence)}`)
}

module.exports = {
  generateMnemonic,
  generateAndDisplayMnemonic
}
