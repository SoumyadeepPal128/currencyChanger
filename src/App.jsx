import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import {InputBox} from "./components/index";

function App() {
  const [amount, setAmount] = useState()
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState()


  const currencyInfo=useCurrencyInfo(from)
  const options=Object.keys(currencyInfo)

  const convert=()=>{
    setConvertedAmount((amount*currencyInfo[to]).toFixed(2))
  }

  const swap=()=>{
    const temp=from;
    setFrom(to);
    setTo(temp);
    const tempp=amount;
    setConvertedAmount(tempp);
    setAmount(convertedAmount);
    
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/jSPNexzrrwA/maxresdefault.jpg)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={(e)=>{
            e.preventDefault()
            convert()
          }}>
            <div className="w-full mb-1">
              <InputBox
              label="from"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency)=>setFrom(currency)}
              onAmountChange={(amount)=>setAmount(amount)}
              selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 cursor-pointer"
              onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
              label="to"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency)=>setTo(currency)}
              onAmountChange={(amount)=>setConvertedAmount(amount)}
              selectedCurrency={to}
              amountDisabled
              />
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
            Convert {from.toUpperCase()} To {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
