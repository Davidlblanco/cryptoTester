import { useState, useEffect } from 'react'
// import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Chart from './components/Chart';
import Footer from './components/Footer';


function App() {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [sma, setSma] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api1.binance.com/api/v3/klines?symbol=BTCUSDT&interval=30m")
      .then(res => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      )
  }, [])
  const smaVal = 3;
  useEffect(() => {
    let closeList = []
    items.forEach((item) => {
      closeList.push(item[4])
    })
    let mean = []
    closeList.forEach((item, index) => {
      if (index > smaVal - 1) {
        let averageList = 0;
        for (let i = index; i < index + smaVal; i++) {
          averageList = averageList + parseFloat(closeList[index])
        }
        averageList = averageList / smaVal
        mean.push(averageList)
      } else {
        mean.push(0)
      }
    })
    setSma(mean)
  }, [items])
  return (
    <div className="App">
      {/* {items.map((item, index) => {
        return (
          <Card item={item} key={index} average={sma[index]} />
        )
      })} */}
      <Chart items={items} average={sma} ></Chart>
      <Footer items={items} average={sma} smaVal={smaVal}></Footer>
    </div>
  );
}

export default App;
