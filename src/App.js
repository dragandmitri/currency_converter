import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/currencyRow/CurrencyRow";
import Header from "./components/header/Header";
import currencyApi from "./helpers/currencyApi";
import Footer from './components/footer/Footer';

const BASE_CURRENCIES = "EUR,USD,AUD,UAH,CAD,PLN,MXN,PHP,SEK,JPY,INR";
const BASE_CURRENCY = "UAH";

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [lastUpdate, setLastUpdate] = useState();
  const [loading, setLoading] = useState(false);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    const getCurrency = async () => {
      setLoading(true);
      try {
        await fetch(currencyApi(BASE_CURRENCY, BASE_CURRENCIES))
          .then((res) => res.json())
          .then((data) => {
            const firstCurrency = Object.keys(data.results)[0];
            setCurrencyOptions([data.base, ...Object.keys(data.results)]);
            setExchangeRate(data.results[firstCurrency]);
            setFromCurrency(data.base);
            setToCurrency(firstCurrency);
            setLastUpdate(data.updated)
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getCurrency();
  }, []);

  useEffect(() => {
    const getSelectedCurrency = async () => {
      setLoading(true);
      try {
        if (fromCurrency != null && toCurrency != null) {
          await fetch(currencyApi(fromCurrency, toCurrency))
            .then((res) => res.json())
            .then((data) => setExchangeRate(data.results[toCurrency]));
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getSelectedCurrency();
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = useCallback((e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }, []);

  const handleToAmountChange = useCallback((e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }, []);

  return (
    <div>
      <Header
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency("UAH")}
      />
      <div>
        <h1>Currency Converter</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className='inputsBlock'>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              onCahngeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
            <div className="equals">=</div>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              onCahngeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </div>
        )}
      </div>
      <Footer updated={lastUpdate} />
    </div>
  );
};

export default App;
