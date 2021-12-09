import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import barColors from './assets/categoryColors';
import { stringToNum } from './assets/mergerHelperFuncs';

const DashCategoricalSpendingPie = (props) => {
  const [monthYear, setMonthYear] = useState(new Date());
  const transactions = useSelector((state) => state.transactions);
  let totalMonthlySpending = 0;

  const preData = {};
  const postData = [];
  transactions.filter((transaction) => {
    if (transaction.date.slice(0, 7) == monthYear.toISOString().slice(0, 7)) {
      console.log(transaction);
      console.log(preData);
      if (preData[transaction.category.categoryName]) {
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

  const renderLabel = ({ x, y, cx, value, category }) => {
    return (
      <text x={x} y={y} fontSize='16' textAnchor={x > cx ? 'start' : 'end'} fill='#888'>
        {`${category} - $${value}`}
      </text>
    );
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const category = payload[0]?.name;
      const total = stringToNum(payload[0]?.value);

      return (
        <div
          className='custom-tooltip'
          style={{
            border: '1px solid #f5f5f5',
            lineHeight: '24px',
            backgroundColor: '#FFFFFF',
            padding: '10px',
            opacity: '0.8',
          }}
        >
          <p>{category}</p>
          <p>{((total / totalMonthlySpending) * 100).toFixed(1)}% </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='dash-categorical-spending-chart-container'>
      <div style={{ textAlign: 'center', paddingTop: '6%' }}>Your Spending By Category</div>
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
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={postData}
              nameKey='category'
              dataKey='value'
              cx='50%'
              cy='50%'
              outerRadius={100}
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
