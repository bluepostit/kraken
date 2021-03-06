# Kraken Currency Converter

A command-line app to convert between two currencies with a simple syntax.

## Install
```bash
npm install -g @bluepostit/kraken
```

## API Key
* Kraken uses [Currency Converter API](https://www.currencyconverterapi.com/) as its data source.
* Sign up [here](https://free.currencyconverterapi.com/free-api-key) for a free key, providing an email address you have access to.
* You should receive an actvation email. Click the link in the email to activate your key.
* Add the following to your `.bashrc`, `.zshrc` or similar:

```bash
export KRAKEN_CONVERTER_API_KEY=<REPLACE WITH YOUR KEY>
```

* Restart your terminal

## Usage

```bash
    Usage
      $ kraken <from> <amount> <to>

    Arguments
      <from>    The currency to convert from, eg. 'usd', 'EUR'
      <amount>  The monetary amount to convert, eg. 200, 1.24
      <to>      The currency to convert to, eg. 'USD', 'eur'
```

### Examples

```bash
$ kraken eur 10 usd

    10 EUR => 11.31 USD
```

```bash
$ kraken nok 156.28 cad

    156.28 NOK => 22.67 CAD
```

## Accuracy and Limitations
* [Currency Converter API](https://www.currencyconverterapi.com/)'s free API service, which Kraken uses, is updated once per hour, according to [their website](https://free.currencyconverterapi.com/). This means that the data that Kraken provides does **not reflect live market rates**.
* Currency Converter API's free API service is restricted to **100 API calls per hour**. If you use Kraken more than 100 times per hour, you risk having your API key banned by Currency Converter.
