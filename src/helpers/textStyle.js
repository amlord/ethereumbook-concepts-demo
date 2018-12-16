// provide commandline colour
const chalk = require('chalk')

const header = chalk.whiteBright
const primary = chalk.bold.green
const secondary = chalk.bold.magentaBright
const note = chalk.grey
const error = chalk.bold.red

module.exports = {
  header,
  primary,
  secondary,
  note,
  error
}
