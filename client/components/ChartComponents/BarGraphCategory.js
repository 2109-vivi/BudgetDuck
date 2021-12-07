import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CategoryLegend from './BarGraphCategoryLegend';
import CustomToolTip from './BarGraphCategoryTooltip';
import barColors from './assets/categoryColors'
import monthChart from './assets/month'
import {budgetMerger, categoryMerger, colorMerger} from './assets/mergerHelperFuncs';
import { currentMonth } from './assets/constants';


const BarGraphCategory = (props) => {

  let transactions = useSelector((state) => state.transactions || []);
  const categories = useSelector((state) => state.auth.categoricalBudgets || []);
  const [month, setMonth] = React.useState(currentMonth);

  transactions = transactions.filter(transaction => transaction.date.slice(5, 7) == month);

  const dataArray = transactions.map((transaction) => {
    return {
      category: transaction.category?.categoryName,
      amount: transaction.amount,
    };
  }) || [];


  let combinedDataArray = categoryMerger(dataArray) || [];
  colorMerger(combinedDataArray);
  budgetMerger(categories, combinedDataArray);

  const prevMonth = (e) => {
    e.preventDefault();
    setMonth(month - 1 < 1
      ? 12
      : month - 1
      );
  }
  const nextMonth = (e) => {
    e.preventDefault();
    setMonth(month + 1 > 12
      ? 1
      : month + 1
      );
  }

  return (
    <>
    <div>
      <h1>{monthChart[month]}</h1>
      <ul style={{textAlign: 'right', listStyle: 'none', marginTop: '-35px'}}>
        <li style={{display: 'inline-block', paddingLeft: '10px'}}>
          <a onClick={prevMonth} href="#">Previous Month</a>
        </li>
        <li style={{display: 'inline-block', paddingLeft: '10px', paddingRight: '10px'}}>
          <a onClick={nextMonth} href="#">Next Month</a>
        </li>
      </ul>
    </div>
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
    </>
  );
}

export default BarGraphCategory;
