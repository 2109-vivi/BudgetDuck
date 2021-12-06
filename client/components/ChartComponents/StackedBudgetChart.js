import React from 'react'
import { useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { currentMonth, monthChart } from './assets/constants';


const StackedBudgetChart = () => {
  const budgetCategories = useSelector((state) => state.auth.categoricalBudgets || [])

  let dataObj =[{}]

  budgetCategories.filter((item)=> {
    if(item.budgetCategories.length > 0 && item.budgetCategories[0] !== 0){
      return item
    }
  }).map((element) => {
    dataObj[0][[element.categoryName]] = element.budgetCategories[0].budgetForCategory
  })
  //Totals the values of our object to give us our total budget amount
  const totalBudgetCategoryAmount = Object.values(dataObj[0]).reduce((acc, total) => {
    return acc + total
  },0)

  //Adds an unallocated key to our datobject with totalBudgetCategoryAmount
  dataObj[0]["Unallocated"] = totalBudgetCategoryAmount
  //Adds a name key with the current month
  dataObj[0]["name"]= `Budget for ${monthChart[currentMonth]}`

  const data = [
    {
      name: `Budget for ${monthChart[currentMonth]}`,
      Food: 4000,
      Bank: 2400,
      Community: 5000,
      Unallocated: 3000,
    }
  ];
  return (
    <div>
      {console.log(dataObj)}
      <h1 style={{textAlign : 'center'}}>
    Stacked Budget Chart
      </h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Food" stackId="a" fill="#8884d8" />
          <Bar dataKey="Unallocated"stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StackedBudgetChart
