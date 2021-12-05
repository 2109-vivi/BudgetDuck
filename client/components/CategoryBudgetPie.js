import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CategoryBudgetPieChart = () => {
const budgetCategories = useSelector((state) => state.auth.categoricalBudgets || [])
const monthlyBudget = useSelector((state) => state.auth.monthlyBudget)

//For some reason the useSelector is not causing the labels to render on the pie chart. This is an ongoing issue in recharts. Since I set isAnimationActive to false, everything works, there just isn't an animation.

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

//This gets the total amount allocated towards budgets
const totalAmountAllocated = test.reduce((acc,total) => {
  return acc + total.budget
},0)

//Adds another data point which consists of the amount that is unallocated
test.push({
    "name": "Unallocated",
    "budget": monthlyBudget - totalAmountAllocated//monthlyBudget - budgetcategory total
})

  return(
  <div>
    {/* {console.log("Monthly Budget -->",monthlyBudget)}
    {console.log("Total Budget Amount Spent --->",totalAmountSpent)}
    {console.log("dataArray",test)} */}
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
