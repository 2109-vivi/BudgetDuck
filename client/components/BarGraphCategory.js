import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarGraphCategory = (props) => {

  let transactions = useSelector((state) => state.transactions || []);

  const barColors = ["#D99694", "#FAC090", '#FFFD70', "#C3D69B", "#93CDDD", "#558ED5", ]
  const dataArray = transactions.map((transaction) => {
    return {
      category: transaction.category.categoryName,
      amount: transaction.amount,
    };
  });

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
    //random number from 2000 to 5000
    category.budget = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
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
          <Bar dataKey="amount" stackId="a" fill="#8884d8">
            {
              output.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]}/>
            ))
            }
          </Bar>
          <Bar dataKey="budget" stackId="b" fill="#3DD7B2">
          </Bar>

        </BarChart>
      </ResponsiveContainer>
  );
}

export default BarGraphCategory;
