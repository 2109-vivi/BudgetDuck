import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from 'recharts'


const BudgetHistoryLineGraph = () => {
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
//Sorts so months are formatted Jan -> Dec
  const budgetData = budgetHistory.sort((a,b) =>  {
    return a.month - b.month
  }).map((element) => {
    return {
      "name" : monthChart[element.month],
      "Budget": element.budget,
      //Filters based on the transactions with the same MONTH
      "Transactions": transactions.filter((item) => {
        return element.month == item.date.slice(5,7)
      })
      //Filters based on the transactions with the same YEAR
      .filter((budgetYear)=> {
        return element.year == budgetYear.date.slice(0,4)
      })
      .map((item) => {
        return +item.amount
      })
      .filter((amount) => {
        return amount > 0
      })
      .reduce((acc, total) => {
        return acc + total
        },0)
    }
  })

  return (
    <div>
    <h1 style={{textAlign : 'center'}}>
        Cool Description Here
    </h1>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={budgetData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" domain= {[5, "dataMax"]}/>
        <YAxis domain ={[0,'dataMax + 1000']}/>
        <Tooltip />
        <Legend verticalAlign="bottom" wrapperStyle={{ position: 'relative' }}/>
        <Line type="linear" dataKey="Budget" stroke="#118C4F" activeDot={{ r: 8 }} />
        <Line type="linear" dataKey="Transactions" stroke="#5929D1" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default BudgetHistoryLineGraph
