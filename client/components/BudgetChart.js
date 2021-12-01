import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts';
const BudgetChart = () => {
  const budget = useSelector((state) => state.auth.monthlyBudget)
  //Once we work in the Plaid API, we can take the total amount of transaction data and update the state here: const transactions = useSelector((state) => state.transactions),  and we will then map through the entire array and return the total transaction amount.
  const data = [
    {
      "name": "Current Spending",
      "Amount": 2035 //Will eventually be total transaction data
    }
  ]
  return<div>
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
              <Bar dataKey="Amount" fill="#118C4F" radius={[50, 50, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
}

export default BudgetChart
