import React, { useEffect, useState } from 'react'
//9sma
export default function Footer({ items, average, smaVal }) {
    const [result, setResult] = useState(0)
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
            if (average[index - 1] < items[index - 1][4]) {
                //buy
                if (open < close) {
                    counter = counter + 1 * leverage
                    gainPoints = gainPoints + (close - open) * leverage
                    console.log('buy gain')
                    leverage++
                }
                else {
                    console.log('buy loss')
                    counter = counter - 1 * leverage
                    lossPoints = lossPoints + (open - close) * leverage
                    leverage = 1
                }
            }
            else if (average[index - 1] > items[index - 1][4]) {
                //sell
                if (open > close) {
                    console.log('sell gain')
                    counter = counter + 1 * leverage
                    gainPoints = gainPoints + (open - close) * leverage
                    leverage++
                }
                else {
                    console.log('sell loss')
                    counter = counter - 1 * leverage
                    lossPoints = lossPoints + (close - open) * leverage
                    leverage = 1
                }
            }
        });
        console.log(counter)
        setResult(counter)
        setGainPoints(gainPoints)
        setLossPoints(lossPoints)
    }, [items, average])
    console.log(result)
    return (
        <div>
            Result: {result}
            Gain: {gainPoints}
            Loss: {lossPoints}
        </div>
    )
}
