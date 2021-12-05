import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CategoryLegend from './BarGraphCategoryLegend';
import CustomToolTip from './BarGraphCategoryToolTip';
import barColors from './assets/categoryColors'
import categoryMerger from './assets/categoryMerger';

const BarGraphCategory = (props) => {

  let transactions = useSelector((state) => state.transactions || []);
  let categories = useSelector((state) => state.auth.categoricalBudgets || []);
  console.log({categories});

  const dataArray = transactions.map((transaction) => {
    return {
      category: transaction.category.categoryName,
      amount: transaction.amount,
    };
  });

  let combinedDataArray = categoryMerger(dataArray);
  console.log({combinedDataArray});
  combinedDataArray.forEach((category, index) => {
    //random number from 2000 to 5000
    category.budget = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    category.color = barColors[index];
  })


  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={combinedDataArray}
          margin={{top: 20,right: 30, left: 20, bottom: 5, }}
        >
          <XAxis dataKey="category" xAxisId={0}/>
          <XAxis dataKey="category" xAxisId={1} hide/>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomToolTip />} />
          <Legend
            content={<CategoryLegend data={combinedDataArray}/>}
            wrapperStyle={{
              lineHeight: '40px',
              position: 'relative',
            }}
          />
          <Bar dataKey="budget" barSize={80} xAxisId={1} fill="#3D3D3D"/>
          <Bar dataKey="amount" barSize={55} XAxisId={0} fill="#8B8E8D"  fillOpacity={0.9} >
            {combinedDataArray.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]}/>
              ))}
          </Bar>
      </BarChart>
      </ResponsiveContainer>
  );
}

export default BarGraphCategory;
