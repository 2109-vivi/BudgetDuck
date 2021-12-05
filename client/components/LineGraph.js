import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from 'recharts'


const LineGraph = () => {
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

  const budgetData = budgetHistory.map((element) => {
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
      <LineChart data={budgetData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain ={[0,6000]}/>
        <Tooltip />
<<<<<<< Updated upstream:client/components/LineGraph.js
        <Legend verticalAlign="bottom" height={-100}/>
        <Line type="monotone" dataKey="Budget" stroke="#118C4F" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="transactions" stroke="#5929D1" />
=======
        <Legend verticalAlign="bottom" wrapperStyle={{ position: 'relative' }}/>
        <Line type="linear" dataKey="Budget" stroke="#118C4F" activeDot={{ r: 8 }} />
        <Line type="linear" dataKey="Transactions" stroke="#5929D1" />
>>>>>>> Stashed changes:client/components/BudgetHistoryLineGraph.js
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default LineGraph
