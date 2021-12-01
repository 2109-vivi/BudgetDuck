import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts';
import { getTransactionsFromDatabase } from '../store/transactions';

const BudgetChart = () => {
  const budget = useSelector((state) => state.auth.monthlyBudget)
  const transactions = useSelector((state) => state.transactions)
  // const token = localStorage.getItem('token')
  // const dispatch = useDispatch()
  //Once we work in the Plaid API, we can take the total amount of transaction data and update the state here: const transactions = useSelector((state) => state.transactions),  and we will then map through the entire array and return the total transaction amount.

  // useEffect(() => {
  //   dispatch(getTransactionsFromDatabase(token))
  // },[])


  // const mappedData = transactions.filter((item) => {
  //   return item.amount > 0
  // }).reduce((acc, total) => {
  //   return acc + total.amount
  // }, 0)

  const data = [
    {
      "name": "Current Spending",
      "Amount": 2000 //Will eventually be total transaction data
    }
  ]
  return (
    (transactions.length > 0 ? (
      <div>
        {console.log(transactions)}
          <h1 style={{textAlign : 'center'}}>
            Your Budget is: {`$${budget}`}
          </h1>
          {/* As of right now, the container takes up the entire window using width in ResponsiveContainer.  */}
          <ResponsiveContainer  width='100%' height={400}>
            <BarChart data= {data} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, 4000]}/>
              <Tooltip />
              <Bar dataKey="Amount" fill="#118C4F"  radius={[50, 50, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
    ) : (<div>
      <h1>loading.....</h1>
    </div>
    )
    )
  )
}

export default BudgetChart
