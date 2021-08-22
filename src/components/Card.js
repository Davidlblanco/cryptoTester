import React from 'react'

export default function Card({ item, average }) {
    const attributes = [
        ' Open time',
        ' Open',
        ' High',
        ' Low',
        ' Close',
        ' Volume',
        ' Close time',
        ' Quote asset volume',
        ' Number of trades',
        ' Taker buy base asset volume',
        ' Taker buy quote asset volume',
        ' Ignore'
    ]

    const formatTime = (timestp) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestp)
    }
    return (
        <div style={{ border: '1px solid grey' }}>
            {item.map((item, index) => {
                return (
                    <p key={index}>
                        <span>
                            {attributes[index] + ' - '}
                        </span>
                        {index === 0 ? formatTime(item) : item}
                    </p>
                )
            })}
            <p>
                <span>
                    {'sma20 - '}
                </span>
                {average}
            </p>
        </div>
    )
}



