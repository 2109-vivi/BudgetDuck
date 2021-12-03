import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTransactionsFromDatabase } from '../store/transactions';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BarGraphCategory = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsFromDatabase(props.accessToken));
  }, []);

  let transactions = useSelector((state) => state.transactions || []);

  const dataArray = transactions.map((transaction) => {
    return {
      category: transaction.category.categoryName,
      amount: transaction.amount,
    };
  });

  console.log('dataArray', dataArray);

  let output = [];

  dataArray.forEach((item) => {
    let existing = output.filter((value) => {
      return value.category === item.category;
    });
    if (existing.length) {
      let existingIndex = output.indexOf(existing[0]);
        output[existingIndex].amount = +output[existingIndex].amount + +item.amount
    } else {
      output.push(item);
    }
  });

  console.log(output);
  output.forEach(category => {
    category.budget = 5000;
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={output}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" stackId="a" fill="#3DD7B2" />
          <Bar dataKey="budget" stackId="b" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  );
}

export default BarGraphCategory;
