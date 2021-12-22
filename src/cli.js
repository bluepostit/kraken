import kleur from 'kleur'
import Converter from './converter'

const showHelp = () => {
  const usage = `
    Usage
      $ kraken ${kleur.blue('<from>')} ${kleur.green('<amount>')} ${kleur.magenta('<to>')}

    Arguments
      ${kleur.blue('<from>')}    The currency to convert from, eg. 'usd', 'EUR'
      ${kleur.green('<amount>')}  The monetary amount to convert, eg. 200, 1.24
      ${kleur.magenta('<to>')}      The currency to convert to, eg. 'USD', 'eur'
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
    const fromPart = `${kleur.yellow(amount)} ${kleur.yellow(from.toUpperCase())}`
    const toPart = `${kleur.green().bold(result)} ${kleur.green(to.toUpperCase())}`
    console.log(`\n    ${fromPart} => ${toPart}\n`)
  } catch (e) {
    console.log(kleur.red().bold(e))
    showHelp()
  }
}
