import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App-style.css'

const App = () => {
  
  const ENDPOINT  = 'latest'
  const API_KEY   = '731d5ce14d96899b1e1bb5b5b9d93b61'
  const SYMBOLS   = 'CAD,IDR,JPY,CHF,EUR,USD'

  const [curse, setCurse] = useState([])

  const randomInteger = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }

  const getWeSell = (rates, margin) => {
    return rates + (rates * margin/100)
  }
  const getWeBuy = (rates, margin) => {
    return rates - (rates * margin/100)
  }
  
  useEffect(() => {
    axios.get(`http://api.exchangeratesapi.io/v1/${ENDPOINT}?access_key=${API_KEY}&symbols=${SYMBOLS}`)
      .then(response => {
        if (response.status === 200) {
          const { CAD, CHF, EUR, IDR, JPY, USD } = response.data.rates
          
          setCurse([
            {
              name: 'CAD',
              rate: CAD,
              margin: randomInteger(2, 4)
            },
            {
              name: 'IDR',
              rate: IDR,
              margin: randomInteger(2, 4)
            },
            {
              name: 'JPY',
              rate: JPY,
              margin: randomInteger(2, 4)
            },
            {
              name: 'CHF',
              rate: CHF,
              margin: randomInteger(2, 4)
            },
            {
              name: 'EUR',
              rate: EUR,
              margin: randomInteger(2, 4)
            },
            {
              name: 'USD',
              rate: USD,
              margin: randomInteger(2, 4)
            }
          ])
        }
      })
  }, [])

  return (
    <>
      <div className="container">
        <table>
          <tr>
            <th></th>
            <th>WE BUY</th>
            <th>EXCHANGE RATE</th>
            <th>WE SELL</th>
          </tr>
          {curse.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{getWeBuy(item.rate, item.margin)}</td>
              <td>{item.rate}</td>
              <td>{getWeSell(item.rate, item.margin)}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="info">
        <p className="small">* base currency is EUR<br />
        * As for the API, <a href="https://api.exchangeratesapi.io">https://api.exchangeratesapi.io/</a></p>
      </div>
    </>
  );
}

export default App;
