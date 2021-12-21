import { env } from 'process'
import FetchMock from 'jest-fetch-mock'
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
    let c

    beforeEach(() => {
      FetchMock.resetMocks()
      setApiKey()
      c = new Converter()
    })

    it('raises an exception if no source currency is given', () => {
      return expect(c.convert(null, 'usd', 1)).rejects.toMatch('source currency')
    })

    it('raises an exception if no target currency is given', () => {
      return expect(c.convert('usd', null, 1)).rejects.toMatch('target currency')
    })

    it('raises an exception if no amount is given', () => {
      return expect(c.convert('usd', 'eur', null)).rejects.toMatch('amount')
    })

    it('raises an exception if a negative amount is given', () => {
      return expect(c.convert('usd', 'eur', -3.54)).rejects.toMatch('positive')
    })

    it('raises an exception if no API token can be found', () => {
      clearApiKey()
      return expect(c.convert('usd', 'eur', 1)).rejects.toMatch('API')
    })

    it('returns a numeric amount for a valid query', () => {
      const rate = 0.89
      const response = {
        USD_EUR: rate
      }
      fetch.mockResponseOnce(JSON.stringify(response))
      return expect(c.convert('usd', 'eur', 1)).resolves.toBe(rate)
    })

    it('returns the correct amounts for various queries', () => {
      const scenarios = require('./fixtures/valid-tests.json')
      scenarios.forEach(async data => {
        const { from, to, amount, apiResponse, result } = data
        fetch.mockResponseOnce(JSON.stringify(apiResponse))
        const actualResult = await c.convert(from, to, amount)
        expect(actualResult).toBe(result)
      })
    });
  })
})
