import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AllTransactions = (props) => {
  const transactions = useSelector((state) => state.transactions);

  return transactions.length === 0 ? (
    <h1>loading</h1>
  ) : (
    <div>
      <h1>Transactions</h1>
      <header>
        <Link to="/transactions/add">Add Transaction</Link>
        <Link style={{padding: '10px'}} to="/transactions/edit">Edit Transactions</Link>
      </header>
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
    </div>
  );
};

export default AllTransactions;
