import React, { useEffect, useState } from 'react'

export default function Footer({ items, average, smaVal }) {
    const [result, setResult] = useState(0)
    useEffect(() => {
        let counter = 0

        items.forEach((item, index) => {
            if (index <= smaVal - 1) return;
            const open = parseFloat(item[1]);
            const close = parseFloat(item[4]);
            if (average[index - 1] < items[index - 1][4]) {
                //buy
                if (open < close) {
                    counter = counter + 1
                    console.log('buy gain')
                }
                else {
                    console.log('buy loss')
                    counter = counter - 1
                }
            }
            else if (average[index - 1] > items[index - 1][4]) {
                //sell
                if (open > close) {
                    console.log('sell gain')
                    counter = counter + 1
                }
                else {
                    console.log('sell loss')
                    counter = counter - 1
                }
            }
        });
        console.log(counter)
        setResult(counter)
    }, [items, average])
    console.log(result)
    return (
        <div>
            Result: {result}
        </div>
    )
}
