import { env } from 'process'

export default class Converter {
  convert(from, to, amount) {
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
    return amount
  }
}
