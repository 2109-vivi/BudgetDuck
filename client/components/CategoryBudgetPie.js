import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CategoryBudgetPieChart = () => {
const budgetCategories = useSelector((state) => state.auth.categoricalBudgets || [])
const monthlyBudget = useSelector((state) => state.auth.monthlyBudget)
//For some reason the useSelector is not causing the labels to render on the pie chart. This is an ongoing issue in recharts. Delete the use selector to get the labels to show and the animation to go

const test= budgetCategories.filter((item)=> {
  if(item.budgetCategories.length > 0){
    return item
  }
}).
map((element) => {
  return {
    "name": element.categoryName,
    "budget": element.budgetCategories[0].budgetForCategory
  }
})
//Add the another data point which consists of the amount
test.push({
    "name": "Unallocated",
    "budget": 9000 - 6000 //monthlyBudget - budgetcategory total
})
//You need to get the total amount of all the budgets (using the test const) and subtract it from the current Budget
const totalAmountSpent = "wow"

  return(
  <div>
    {console.log(test)}
  <h1 style={{textAlign : 'center'}}>
    Category Budget Distribution
  </h1>
  <ResponsiveContainer width='100%' height= {500}>
    <PieChart>
    <Pie data={test} dataKey="budget" nameKey="name" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" isAnimationActive={false} label={true}/>
    <Tooltip/>
    <Legend />
    </PieChart>
  </ResponsiveContainer>
  </div>
  )
}

export default CategoryBudgetPieChart
