import { env } from 'process'

const BASE_URL = 'https://free.currconv.com/api/v7/convert?compact=ultra'

const convert = async (from, to, amount) => {
  const apiKey = env.KRAKEN_CONVERTER_API_KEY
  const currenciesKey = `${from.toUpperCase()}_${to.toUpperCase()}`
  const url = `${BASE_URL}&q=${currenciesKey}&apiKey=${apiKey}`
  const res = await fetch(url)
  const data = await res.json()
  return data[currenciesKey]
}

export default class Converter {
  async convert(from, to, amount) {
    if (!from) {
      throw 'No source currency given'
    }
    if (!to) {
      throw 'No target currency given'
    }
    if (!amount && amount !== 0) {
      throw 'No amount given'
    }
    if (amount < 0) {
      throw 'Amount must be positive'
    }
    if (!env.KRAKEN_CONVERTER_API_KEY) {
      throw 'No Kraken Converter API key found'
    }
    return await convert(from, to, amount)
  }
}
