import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import barColors from './assets/categoryColors';

const DashCategoricalSpendingPie = (props) => {
  const [monthYear, setMonthYear] = useState(new Date());
  const transactions = useSelector((state) => state.transactions);
  let totalMonthlySpending = 0;

  const preData = {};
  const postData = [];
  transactions.filter((transaction) => {
    if (transaction.date.slice(0, 7) == monthYear.toISOString().slice(0, 7)) {
      if (preData[transaction] && preData[transaction.category.categoryName]) {
        preData[transaction.category.categoryName] += +transaction.amount;
        totalMonthlySpending += +transaction.amount;
      } else {
        preData[transaction.category.categoryName] = +transaction.amount;
        totalMonthlySpending += +transaction.amount;
      }
    }
  });

  for (const [key, value] of Object.entries(preData)) {
    postData.push({ category: key, value: +value.toFixed(2) });
  }

  const handleClick = (action) => {
    action == 'prev'
      ? setMonthYear(new Date(monthYear.setMonth(monthYear.getMonth() - 1)))
      : setMonthYear(new Date(monthYear.setMonth(monthYear.getMonth() + 1)));
  };

  // console.log(totalMonthlySpending);

  // const renderLabel = (entry) => {
  //   return `${entry.category} - ${((entry.value / totalMonthlySpending) * 100).toFixed(0)}%`;
  // };

  const renderLabel = ({ x, y, cx, value, category }) => {
    return (
      <text x={x} y={y} fontSize='16' textAnchor={x > cx ? 'start' : 'end'} fill='#888'>
        {`${category} - ${((value / totalMonthlySpending) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='dash-categorical-spending-chart-container'>
      <div style={{ textAlign: 'center', paddingTop: '1%' }}>Your Spending By Category</div>
      <div
        className='categorical-spending-pie-pick-month'
        style={{ display: 'flex', justifyContent: 'center', height: '5%' }}
      >
        <button onClick={() => handleClick('prev')}>Prev month</button>
        <div>{`${monthYear.toDateString().slice(4, 7)} ${monthYear.toDateString().slice(11, 15)} `}</div>
        <button onClick={() => handleClick('next')}>Next month</button>
      </div>
      <div style={{ height: '95%' }}>
        <ResponsiveContainer width='100%' height={400}>
          <PieChart>
            <Pie
              data={postData}
              nameKey='category'
              dataKey='value'
              cx='50%'
              cy='50%'
              outerRadius={150}
              fill='#000000'
              isAnimationActive={true}
              label={renderLabel}
            >
              {postData.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />;
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashCategoricalSpendingPie;
