import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from 'recharts'


const LineGraph = () => {

  const data = [
    {
      "name": "June",
      "Budget": 4000,
      "Transactions": 1000,

    },
    {
      "name": "July",
      "Budget": 3000,
      "Transactions": 1398,

    },
    {
      "name": "August",
      "Budget": 3000,
      "Transactions": 4000,

    },
    {
      "name": "September",
      "Budget": 4000,
      "Transactions": 3908,

    },
    {
      "name": "October",
      "Budget": 5000,
      "Transactions": 4800,

    },
    {
      "name": "November",
      "Budget": 5000,
      "Transactions": 3800,

    },
    {
      "name": "December",
      "Budget": 3490,
      "Transactions": 4300,

    }
  ]
  return (
    <div>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={500} height={300} data={data} margin={{top: 5,right: 30,left: 20 ,bottom: 5,}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain ={[0,10000]}/>
        <Tooltip />
        <Legend verticalAlign="bottom"/>
        <Line type="monotone" dataKey="Budget" stroke="#118C4F" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Transactions" stroke="#5929D1" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default LineGraph
