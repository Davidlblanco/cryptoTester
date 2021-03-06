import React, { useEffect, useState } from 'react'
//3sma
export default function Footer({ items, average, smaVal }) {
    const [trades, setTrades] = useState(0)
    const [gainPoints, setGainPoints] = useState(0)
    const [lossPoints, setLossPoints] = useState(0)

    useEffect(() => {
        let counter = 0
        let gainPoints = 0
        let lossPoints = 0
        let leverage = 1
        items.forEach((item, index) => {
            if (index <= smaVal - 1) return;
            const open = parseFloat(item[1]);
            const close = parseFloat(item[4]);
            if (average[index - 1] > open) {
                //buy
                if (open < close) {
                    counter = counter + 1
                    gainPoints = gainPoints + (close - open)
                    // console.log('buy gain')
                    leverage++
                }
                else {
                    // console.log('buy loss')
                    counter = counter + 1
                    lossPoints = lossPoints + (open - close)
                    leverage = 1
                }
            }
            else if (average[index - 1] < open) {
                //sell
                if (open > close) {
                    // console.log('sell gain')
                    counter = counter + 1
                    gainPoints = gainPoints + (open - close)
                    leverage++
                }
                else {
                    // console.log('sell loss')
                    counter = counter + 1
                    lossPoints = lossPoints + (close - open)
                    leverage = 1
                }
            }
        });
        setTrades(counter)
        setGainPoints(gainPoints)
        setLossPoints(lossPoints)
    }, [items, average])
    // console.log(result)
    return (
        <div>
            <p>Trades: {trades}</p>
            <p>Result: {gainPoints - lossPoints}</p>
            <p>Gain: {gainPoints}</p>
            <p>Loss: {lossPoints}</p>


        </div>
    )
}
