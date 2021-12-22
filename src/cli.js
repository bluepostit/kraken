import Converter from './converter'

const showHelp = () => {
  const usage = `
    Usage
      $ kraken <from> <amount> <to>

    Arguments
      <from>    The currency to convert from, eg. 'usd', 'EUR'
      <amount>  The monetary amount to convert, eg. 200, 1.24
      <to>      The currency to convert to, eg. 'USD', 'eur'
  `
  console.log(usage)
}

const getArgs = (cliArgs) => {
  if (cliArgs.length < 3) {
    throw 'Not enough arguments'
  } else if (cliArgs.length > 3) {
    throw 'Too many arguments'
  }
  let [ from, amount, to ] = cliArgs
  amount = parseFloat(amount)
  if (isNaN(amount)) {
    throw 'Amount must be numeric'
  }
  const nonAlphaRegex = /[^a-zA-Z]/
  if (nonAlphaRegex.test(from) || nonAlphaRegex.test(to)) {
    throw 'Currencies can only contain letter characters'
  }
  return {
    from,
    to,
    amount
  }
}

export default async function cli(args) {
  try {
    const { from, amount, to } = getArgs(args)
    c = new Converter()
    const result = await c.convert(from, to, amount)
    console.log(`    ${amount} ${from.toUpperCase()} => ${result} ${to.toUpperCase()}`)
  } catch (e) {
    console.log(e)
    showHelp()
  }
}
