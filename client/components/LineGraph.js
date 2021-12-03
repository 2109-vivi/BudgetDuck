import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from 'recharts'


const LineGraph = () => {
  const showState = useSelector((state) => state)
  const budgetHistory = useSelector((state) => state.auth.historicalBudgets || [])
  const transactions = useSelector((state) => state.transactions || [])


  const monthChart = {
    1: "January",
    2: "February",
    3: "March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12: "December",
  }

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
   const dataArray =transactions.filter((item) => {
    return item.month == item.date.slice(5,7)
  }).map((item) => {
    return Number(item.amount)
  })
  .filter((amount) => {
    return amount > 0
  })
  .reduce((acc, total) => {
    return acc + total
    },0)

  const test = budgetHistory.map((element) => {
    return {
      "name" : monthChart[element.month],
      "Budget": element.budget,
      "transactions": transactions.filter((item) => {
        return element.month == item.date.slice(5,7)
      }).map((item) => {
        return Number(item.amount)
      })
      .filter((amount) => {
        return amount > 0
      })
      .reduce((acc, total) => {
        return acc + total
        },0)
    }
  }).reverse()

  return (
    <div>
    <h1 style={{textAlign : 'center'}}>
            Cool Description Here
          </h1>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={test}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain ={[0,6000]}/>
        <Tooltip />
        <Legend verticalAlign="bottom" height={-100}/>
        <Line type="monotone" dataKey="Budget" stroke="#118C4F" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="transactions" stroke="#5929D1" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default LineGraph
