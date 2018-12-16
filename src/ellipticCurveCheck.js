const style = require('./helpers/textStyle')
const inquirer = require('inquirer')

// handle big numbers in js
const BigNumber = require('bignumber.js')

async function ellipticCurveCheck() {
  // prime order of elliptic curve (for secp256k1 - used by Bitcoin & Ethereum)
  const primeOrder = BigNumber('115792089237316195423570985008687907853269984665640564039457584007908834671663')
  let xCoord = '49790390825249384486033144355916864607616083520101638681403973749255924539515'
  let yCoord = '59574132161899900045862086493921015780032175291755807399284007721050341297360'

  // prompt user to enter x-coordinate
  const xResponse = await inquirer.prompt([{
    type: 'input',
    name: 'xCoord',
    message: 'X-axis co-ordinate',
    default: xCoord
  }])

  // prompt user to enter y-coordinate
  const yResponse = await inquirer.prompt([{
    type: 'input',
    name: 'yCoord',
    message: 'Y-axis co-ordinate',
    default: yCoord
  }])

  xCoord = BigNumber(xResponse.xCoord)
  yCoord = BigNumber(yResponse.yCoord)

  const result = xCoord.exponentiatedBy(3).plus(7).minus(yCoord.exponentiatedBy(2)).modulo(primeOrder).toString(10)

  console.log('\n')
  console.log(`> Prime Order of the secp256k1 curve:\n\n${style.secondary(primeOrder.toString(10))}\n\n`)
  console.log(`> X-axis co-ordinate:\n\n${style.secondary(xCoord.toString(10))}\n\n`)
  console.log(`> Y-axis co-ordinate:\n\n${style.secondary(yCoord.toString(10))}\n\n`)
  console.log(`> Outcome:\n\n${result === "0" ? style.primary("***** CO-ORDINATES ON CURVE *****") : style.error("!!!!! INVALID CO-ORDINATES !!!!!")}`)
}

module.exports = {
  ellipticCurveCheck
}
