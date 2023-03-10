import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { ReactComponent as Exchange } from './assets/exchange.svg';

import usdFlag from './assets/usdFlag.png'
import brlFlag from './assets/brlFlag.png'
import eurFlag from './assets/eurFlag.png'
import gbpFlag from './assets/gbpFlag.png'

function App() {

  const [ quotation, setQuotation ] = useState([]);
  const [ currencyToCalculate, setCurrencyToCalculate ] = useState('')
  const [ intervalButton, setIntervalButton ] = useState('FiveDays')
  const [ diasCotados, setDiasCotados ] = useState([]);

  const [ firstCoin, setFirstCoin ] = useState('0')
  const [ secondCoin, setSecondCoin ] = useState('0')

  const [ chooseFirstCoin, setChooseFirstCoin ] = useState('USD')
  const [ chooseSecondCoin, setChooseSecondCoin ] = useState('BRL')


  let currency = `${chooseFirstCoin}-${chooseSecondCoin}`

  const url = `https://economia.awesomeapi.com.br/last/${currency}`
  const urlYear = `https://economia.awesomeapi.com.br/json/daily/${currency}/360`
  const urlMonth = `https://economia.awesomeapi.com.br/json/daily/${currency}/30`
  const urlFortnight = `https://economia.awesomeapi.com.br/json/daily/${currency}/15`
  const urlFiveDays = `https://economia.awesomeapi.com.br/json/daily/${currency}/5`


  async function getData() {
    if (intervalButton === 'FiveDays') {
      fetch(urlFiveDays).then(result => {
        return result.json()
      }).then(json => {
        let objectLastFiveDays = json
        let arr = []
        for (const key in objectLastFiveDays) {
          arr.push(objectLastFiveDays[key].ask)
        }
        setCurrencyToCalculate(arr[0])
        setQuotation(arr.reverse())
      })
    }
    
    if (intervalButton === 'FifteenDays') {
      fetch(urlFortnight).then(result => {
        return result.json()
      }).then(json => {
        let objectLastFiveDays = json
        let arr = []
        for (const key in objectLastFiveDays) {
          arr.push(objectLastFiveDays[key].ask)
        }
        setCurrencyToCalculate(arr[0])
        setQuotation(arr.reverse())
      })
    }
    
    if (intervalButton === 'AMonth') {
      fetch(urlMonth).then(result => {
        return result.json()
      }).then(json => {
        let objectLastFiveDays = json
        let arr = []
        for (const key in objectLastFiveDays) {
          arr.push(objectLastFiveDays[key].ask)
        }
        setCurrencyToCalculate(arr[0])
        setQuotation(arr.reverse())
      })
    }
    
    if (intervalButton === 'AYear') {
      fetch(urlYear).then(result => {
        return result.json()
      }).then(json => {
        let objectLastFiveDays = json
        let arr = []
        for (const key in objectLastFiveDays) {
          arr.push(objectLastFiveDays[key].ask)
        }
        setCurrencyToCalculate(arr[0])
        setQuotation(arr.reverse())
      })
    }


    const dates = []
    
    for (let i = 0; i < quotation.length; i++) {
      const data = new Date();
      data.setDate(data.getDate() - i);
      dates.push(data.toLocaleString('pt-BR', {day: 'numeric', month: 'long', year: 'numeric'}))
    }
    setDiasCotados(dates)
  }


  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [intervalButton])


  const options = {
    chart: {
      id: "basic-bar",
      height: 300,
      type: 'area',
      toolbar: {
        show: false,
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight'
    },
    xaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      // min: 4.5,
      tickAmount: 4
    },
    fill: {
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 0],
      }
    },
    // tooltip: {
    //   custom
    // }
  }

  const series = [
    {
      name: 'currency',
      data: quotation
    }
  ]

  function calculate() {
    getData()
    
    fetch(url).then(result => {
      return result.json()
    }).then(json => {
      const quotation = json[`${chooseFirstCoin}${chooseSecondCoin}`].ask
      setSecondCoin(parseFloat(quotation * firstCoin).toFixed(2))
    })
  }

  return (
    <div className='flex justify-center items-center h-screen bg-[#F8FAFC] font-["Inter"]'>
      <div className='bg-white rounded-2xl px-4 py-4 sm:px-20 sm:py-16 shadow-[0_4px_32px_0_rgba(0,0,0,0.15)]'>
        <h1 className='font-semibold sm:text-xl text-[#0F172A] mb-4'>
          Conversor de moedas
        </h1>

        <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4'>
          <div className='flex rounded-lg border-[1px] border-[#94A3B8] p-4 w-[320px] justify-between'>
            <form>
              {
                chooseFirstCoin === 'USD'
                &&
                <span>$ &nbsp;</span>
              }
              {
                chooseFirstCoin === 'EUR'
                &&
                <span>€ &nbsp;</span>
              }
              {
                chooseFirstCoin === 'BRL'
                &&
                <span>R$ &nbsp;</span>
              }
              {
                chooseFirstCoin === 'GBP'
                &&
                <span>£ &nbsp;</span>
              }
              <input type="text" placeholder='0' onChange={e => setFirstCoin(e.target.value)} className='w-[170px] focus:outline-none'/>
            </form>
            <form className='flex gap-2'>
              {
                chooseFirstCoin === 'USD'
                &&
                <img src={usdFlag} alt="" />
              }
              {
                chooseFirstCoin === 'EUR'
                &&
                <img src={eurFlag} alt="" />
              }
              {
                chooseFirstCoin === 'GBP'
                &&
                <img src={gbpFlag} alt="" />
              }
              {
                chooseFirstCoin === 'BRL'
                &&
                <img src={brlFlag} alt="" />
              }
              <select name="coinA" id="coinA" value={chooseFirstCoin} onChange={e => setChooseFirstCoin(e.target.value)} className='focus:outline-none bg-white' >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="BRL">BRL</option>
              </select>
            </form>
          </div>

          <button onClick={calculate}><Exchange /></button>

          <div className='flex rounded-lg border-[1px] border-[#94A3B8] p-4 justify-between w-[320px]'>
            <div className='flex'>
              {
                chooseSecondCoin === 'USD'
                &&
                <span>$ &nbsp;</span>
              }
              {
                chooseSecondCoin === 'EUR'
                &&
                <span>€ &nbsp;</span>
              }
              {
                chooseSecondCoin === 'BRL'
                &&
                <span>R$ &nbsp;</span>
              }
              {
                chooseSecondCoin === 'GBP'
                &&
                <span>£ &nbsp;</span>
              }
              <h2>{secondCoin}</h2>
            </div>
            <form className='flex gap-2'>
              {
                chooseSecondCoin === 'USD'
                &&
                <img src={usdFlag} alt="" />
              }
              {
                chooseSecondCoin === 'EUR'
                &&
                <img src={eurFlag} alt="" />
              }
              {
                chooseSecondCoin === 'GBP'
                &&
                <img src={gbpFlag} alt="" />
              }
              {
                chooseSecondCoin === 'BRL'
                &&
                <img src={brlFlag} alt="" />
              }
              <select name="coinB" id="coinB" value={chooseSecondCoin} onChange={e => setChooseSecondCoin(e.target.value)} className='focus:outline-none bg-white'>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="BRL">BRL</option>
              </select>
            </form>
          </div>
        </div>

        <h1 className='font-semibold sm:text-xl text-[#0F172A] mb-4 mt-8'>
          Taxa de Câmbio
        </h1>

        <div className='flex flex-col items-center justify-center'>
          <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={options}
                    series={series}
                    type="area"
                    className='w-[320px] sm:w-[500px]'
                  />
                </div>
              </div>
          </div>

          <div className='flex gap-5 justify-between'>
            <button onClick={() => setIntervalButton('FiveDays')} className={intervalButton === 'FiveDays' ? 'text-xs sm:text-sm text-white rounded-full px-2 bg-[#008ffb]' : 'text-xs sm:text-sm rounded-lg px-2'}>5D</button>
            <button onClick={() => setIntervalButton('FifteenDays')} className={intervalButton === 'FifteenDays' ? 'text-xs sm:text-sm text-white rounded-full px-2 bg-[#008ffb]' : 'text-xs sm:text-sm rounded-lg px-2'}>15D</button>
            <button onClick={() => setIntervalButton('AMonth')} className={intervalButton === 'AMonth' ? 'text-xs sm:text-sm text-white rounded-full px-2 bg-[#008ffb]' : 'text-xs sm:text-sm rounded-lg px-2'}>1M</button>
            <button onClick={() => setIntervalButton('AYear')} className={intervalButton === 'AYear' ? 'text-xs sm:text-sm text-white rounded-full px-2 bg-[#008ffb]' : 'text-xs sm:text-sm rounded-lg px-2'}>1Y</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;