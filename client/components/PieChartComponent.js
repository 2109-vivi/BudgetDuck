import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import { getTransactionsFromPlaid } from '../store/transactions';

const PieChartComponent = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsFromPlaid(props.accessToken));
  }, []);

  let transactions = useSelector((state) => state.transactions || '');

  const dataArray = transactions
    .map((transaction) => {
      return {
        category: transaction.category[0],
        value: transaction.amount,
      };
    })
    .filter((transaction) => transaction.value > 0);

  let output = [];

  dataArray.forEach((item) => {
    let existing = output.filter((value) => {
      return value.category === item.category;
    });
    if (existing.length) {
      let existingIndex = output.indexOf(existing[0]);
      output[existingIndex].value = +(
        +output[existingIndex].value + +item.value
      ).toFixed(2);
    } else {
      item.value = +(+item.value).toFixed(2);
      output.push(item);
    }
  });

  const customLabel = (value) => {
    return `$${value.value}`;
  };

  console.log(output);
  return (
    <div>
      <PieChart width={900} height={900}>
        <Pie
          data={output}
          dataKey='value'
          nameKey='category'
          cx='50%'
          cy='50%'
          outerRadius={300}
          fill='#8884d8'
          label={customLabel}
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
