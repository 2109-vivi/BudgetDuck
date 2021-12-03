import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts';
// import { getTransactionsFromDatabase } from '../store/transactions';

const BudgetChart = () => {
  const budget = useSelector((state) => state.auth.monthlyBudget)
  const transactions = useSelector((state) => state.transactions)
  // const token = localStorage.getItem('token')
  // const dispatch = useDispatch()


  // useEffect(() => {
  //   dispatch(getTransactionsFromDatabase(token))
  // },[])



  const totalTransactionAmount = transactions.map((item) => {
    //convert each amount to an int
    return Number(item.amount)
    //Ensure that each amount is a positive number (to avoid added fund transactions)
  }).filter((amount) => {
    return amount > 0
    //Total everything
  }).reduce((acc, total) => {
    return acc + total
    },0)

  const data = [
    {
      "name": "Current Spending",
      "Amount": totalTransactionAmount
    }
  ]
  return (
    (transactions.length > 0 ? (
      <div>
          <h1 style={{textAlign : 'center'}}>
            Your Budget is: {`$${budget}`}
          </h1>
          <ResponsiveContainer  width='100%' height={400}>
            <BarChart data= {data} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, budget]}/>
              <Tooltip />
              <Bar dataKey="Amount" fill="#118C4F"  radius={[50, 50, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
    ) : (<div>
      <h1>Loading.....</h1>
    </div>
      )
    )
  )
}

export default BudgetChart
