import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import barColors from './assets/categoryColors';

const CategoryBudgetPieChart = () => {
const budgetCategories = useSelector((state) => state.auth.categoricalBudgets || [])
const monthlyBudget = useSelector((state) => state.auth.monthlyBudget)

//For some reason the useSelector is not causing the labels to render on the pie chart. This is an ongoing issue in recharts. Since I set isAnimationActive to false, everything works, there just isn't an animation.

//Filter the state to get all the budgets that contain an amount and its value is greater than 0
const budgetData= budgetCategories.filter((item)=> {
  if(item.budgetCategories.length > 0 && item.budgetCategories[0] !== 0){
    return item
  }
}).map((element) => {
  return {
    "name": element.categoryName,
    "budget": element.budgetCategories[0].budgetForCategory
  }
})

//This gets the total amount allocated towards all budgets
const totalAmountAllocated = budgetData.reduce((acc,total) => {
  return acc + total.budget
},0)

//Adds another data point that consists of the amount that is unallocated
budgetData.push({
    "name": "Unallocated",
    "budget": monthlyBudget - totalAmountAllocated//monthlyBudget - budgetcategory total
})

//Colors will always be in ROYGBIV order, but the last index of the array will ALWAYS be grey (Unallocated funds)
const colorsArray = barColors.slice(0,budgetData.length-1)
colorsArray.push('#808080')

  return(
  <div>
  <h1 style={{textAlign : 'center'}}>
    Category Budget Distribution
  </h1>
  <ResponsiveContainer width='100%' height= {500}>
    <PieChart>
    <Pie data={budgetData} dataKey="budget" nameKey="name" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" isAnimationActive={true} label={true}>
    {budgetData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorsArray[index % colorsArray.length]} />
          ))}
    </Pie>
    <Tooltip formatter={(value) => `$${value}`}/>
    <Legend />
    </PieChart>
  </ResponsiveContainer>
  </div>
  )
}

export default CategoryBudgetPieChart
