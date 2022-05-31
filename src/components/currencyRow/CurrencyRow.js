import React from 'react';
import './CurrencyRow.css';

const CurrencyRow = (props) => {
    const { 
        currencyOptions, 
        selectedCurrency, 
        onChangeCurrency,
        onCahngeAmount,
        amount
    } = props

    return (
        <div className='selectBlock'>
            <input type = 'number' className='input' value={amount || 0} onChange={onCahngeAmount} />
            <select value={selectedCurrency} 
            onChange={onChangeCurrency}
            >
                {currencyOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default CurrencyRow;
