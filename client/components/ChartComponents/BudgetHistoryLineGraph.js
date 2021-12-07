import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from 'recharts'
import {monthChart} from './assets/constants'


const BudgetHistoryLineGraph = () => {
  const budgetHistory = useSelector((state) => state.auth.historicalBudgets || [])
  const transactions = useSelector((state) => state.transactions || [])

//Sorts so months are formatted Jan -> Dec
  const budgetData = budgetHistory.sort((a,b) =>  {
    return a.month - b.month
  }).map((element) => {
    return {
      "name" : monthChart[element.month],
      "Budget": element.budget,
      //Filters based on the transactions with the same MONTH
      "Transactions": +transactions.filter((item) => {
        return element.month == item.date.slice(5,7)
      })
      .filter((budgetYear)=> {
        return element.year == budgetYear.date.slice(0,4)//Filters based on the transactions with the same YEAR
      })
      .map((item) => {
        return +item.amount
      })
      .filter((amount) => {
        return amount > 0 //Filters all transactions only if they have a non-zero amount (prevents desposits from rendering.)
      })
      .reduce((acc, total) => {
        return acc + total //Totals all the transactions for each month
        },0)
      .toFixed(2)//cuts the number to 2 decimals (notice that line 19 has a "+" to turn it into an int)
    }
  })

  return (
    <div>
    <h1 style={{textAlign : 'center'}}>
        Yearly Budget History
    </h1>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={budgetData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" domain= {[5, "dataMax"]}/>
        <YAxis domain ={[0, dataMax => Math.round((dataMax + 1000)/1000)* 1000]}/>
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend verticalAlign="bottom" wrapperStyle={{ position: 'relative' }}/>
        <Line type="linear" dataKey="Budget" stroke="#118C4F" activeDot={{ r: 8 }} />
        <Line type="linear" dataKey="Transactions" stroke="#5929D1" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default BudgetHistoryLineGraph
