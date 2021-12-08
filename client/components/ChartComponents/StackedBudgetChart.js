import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import barColors from './assets/categoryColors';
import { currentMonth, monthChart } from './assets/constants';

const StackedBudgetChart = () => {
  const budgetCategories = useSelector((state) => state.auth.categoricalBudgets || []);
  const monthlyBudget = useSelector((state) => state.auth.monthlyBudget);

  //Our data object we'll be using for the bar chart is born.
  let dataObj = [{}];

  //Filling our dataObj with budget names and amounts....
  budgetCategories
    .filter((item) => {
      if (item.budgetCategories.length > 0 && item.budgetCategories[0].budgetForCategory !== 0) {
        return item;
      }
    })
    .map((element) => {
      dataObj[0][[element.categoryName]] = element.budgetCategories[0].budgetForCategory;
    });

  //Totals the values of our object to give us our total budget amount
  const totalBudgetCategoryAmount = Object.values(dataObj[0]).reduce((acc, total) => {
    return acc + total;
  }, 0);

  //Adds an unallocated key to our datobject with the difference between monthly Budget and totalBudgetCategoryAmount
  dataObj[0]['Unallocated'] = monthlyBudget - totalBudgetCategoryAmount;
  //Adds a name key with the current month
  dataObj[0]['name'] = `Budget for ${monthChart[currentMonth]}`;

  //Colors will always be in ROYGBIV  ascending order, but the last index of the array will ALWAYS be grey (Unallocated funds). Just FYI I use Object.keys(dataObj[0]).length-2 (instead of 1) here because the last key is name which won't be used to calculate how many colors we're using.
  const colorsArray = barColors.slice(0, Object.keys(dataObj[0]).length - 2);
  colorsArray.push('#808080');

  //This is to set colors for each budget category so they stack accordingly. I set an empty array and add each Bar component to it (this is so recharts can read it). From there, we have our colors array already imported as barColors. I set up an counter to track the index, and then incremented each iteration so we get a different color each time.Please no more colors my brain hurts

  let index = 0;
  let bars = [];

  for (let key in dataObj[0]) {
    bars.push(<Bar key={key} dataKey={key} stackId='a' fill={colorsArray[index % colorsArray.length]} />);
    index++;
  }
  //As seen on line 28, I added a name key for the sake of adding a title to the bar chart. However, since I don't want the name key to show up in the tooltip (or the stack for that matter) I get rid of it here since it will ALWAYS be the last index of the array.
  bars.pop();

  return (
    <div>
      {/* {console.log(budgetCategories)} */}
      <h1 style={{ textAlign: 'center' }}>Stacked Budget Chart</h1>
      <ResponsiveContainer width='100%' height={300} fill='white'>
        <BarChart data={dataObj}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis domain={[0, (dataMax) => Math.round((dataMax + 1000) / 1000) * 1000]} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend verticalAlign='bottom' wrapperStyle={{ position: 'relative' }} />
          {bars}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBudgetChart;
