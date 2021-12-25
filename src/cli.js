import kleur from 'kleur'
import Converter from './converter'

const showHelp = () => {
  const from = kleur.blue('<from>')
  const amount = kleur.green('<amount>')
  const to = kleur.magenta('<to>')

  const usage = `
    Usage
      $ kraken ${from} ${amount} ${to}

    Arguments
      ${from}    The currency to convert from, eg. 'usd', 'EUR'
      ${amount}  The monetary amount to convert, eg. 200, 1.24
      ${to}      The currency to convert to, eg. 'USD', 'eur'
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
    let result = await c.convert(from, to, amount)
    result = new Intl.NumberFormat().format(result)
    const fromPart = kleur.yellow(`${amount} ${from.toUpperCase()}`)
    const toPart = kleur.green(`${kleur.bold(result)} ${to.toUpperCase()}`)
    console.log(`\n    ${fromPart} => ${toPart}\n`)
  } catch (e) {
    console.log(kleur.red().bold(e))
    showHelp()
  }
}
