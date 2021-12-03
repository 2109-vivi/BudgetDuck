import React from 'react';
import { useSelector } from 'react-redux';

const AllTransactionItems = (props) => {
  const transactions = useSelector((state) => state.transactions);

  return (
    <main>
      {transactions.map((transaction) => (
        <div
          className='detailed-transaction'
          key={transaction.id}
          style={{ padding: '10px' }}
        >
          <div>{transaction.name}</div>
          <div>{transaction.category.categoryName}</div>
          <div>${(Math.round(transaction.amount*Math.pow(10,2))/Math.pow(10,2)).toFixed(2)}</div>
        </div>
      ))}
    </main>
  );
};

export default AllTransactionItems;
