import { env } from 'process'
import Converter from '../src/converter'

const API_KEY_NAME = 'KRAKEN_CONVERTER_API_KEY'

const setApiKey = () => {
  env[API_KEY_NAME] = 'test-key'
}

const clearApiKey = () => {
  delete env[API_KEY_NAME]
}

describe('Converter', () => {
  describe('#convert', () => {
    beforeEach(() => {
      setApiKey()
    })

    it('raises an exception if no source currency is given', () => {
      const c = new Converter()
      expect(() => {
        c.convert(null, 'usd', 1)
      }).toThrow()
    })

    it('raises an exception if no target currency is given', () => {
      const c = new Converter()
      expect(() => {
        c.convert('usd', null, 1)
      }).toThrow()
    })

    it('raises an exception if no amount is given', () => {
      const c = new Converter()
      expect(() => {
        c.convert('usd', 'eur', null)
      }).toThrow()
    })

    it('raises an exception if a negative amount is given', () => {
      const c = new Converter()
      expect(() => {
        c.convert('usd', 'eur', -3.54)
      }).toThrow()
    })

    it('raises an exception if no API token can be found', () => {
      clearApiKey()
      const c = new Converter()
      expect(() => {
        c.convert('usd', 'eur', 1)
      }).toThrow()
    })
  })
})
