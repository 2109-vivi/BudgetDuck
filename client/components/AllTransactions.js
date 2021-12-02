import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AllTransactions = (props) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  console.log(transactions);
  return (
    <div>
      <h1>Transactions</h1>
      <header>
        <button>Add Transaction</button>
        <button>Edit</button>
        <button>Select Category</button>
      </header>
      <main>
        {transactions.map((transaction) => (
          <div className='detailed-transaction' key={transaction.id} style={{ padding: '10px' }}>
            <div>{transaction.name}</div>
            <div>{transaction.category.categoryName}</div>
            <div>${(Math.round(transaction.amount*Math.pow(10,2))/Math.pow(10,2)).toFixed(2)}</div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AllTransactions;
