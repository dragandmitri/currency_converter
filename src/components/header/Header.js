import React, { useEffect, useState } from "react";
import currencyApi from "../../helpers/currencyApi";
import './Header.css';

const Header = () => {
  const [result, setResult] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        await fetch(currencyApi("UAH", "EUR, USD"))
          .then((res) => res.json())
          .then((data) => {
            setResult(data.results);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const currency = Object.entries(result).map((item, index) => {
    return (
      <div className='currencyBlock' key={index}>
        <span className='currencyBlockItem'>{item[0] + ": "}</span>
        <span>{item[1]}</span>
      </div>
    );
  });

  return (
    <div className='headerWrapper'>
      <div className='headerTitle'>Exchange Rates 1 UAH: </div>
      <div className='headerCurrency' >{currency}</div>
    </div>
  );
};

export default Header;
