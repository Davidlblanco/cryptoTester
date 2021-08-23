import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function Chart({ items, average }) {
    const data1 = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page b', uv: 30, pv: 2300, amt: 2300 }, { name: 'Page c', uv: 400, pv: 2400, amt: 2400 }];
    const [data, setData] = useState([])
    useEffect(() => {
        let newData = []
        items.forEach((item, index) => {
            // if (index > 400) {
            const obj = {
                name: new Intl.DateTimeFormat('pt-BR', { month: '2-digit', day: '2-digit' }).format(item[0]),
                uv: item[4]
            }
            newData.push(obj)
            // }
        });
        setData(newData)
    }, [items])
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LineChart width={900} height={450} data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </div>
    );
}



