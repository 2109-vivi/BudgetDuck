import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AllTransactions = (props) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  const handleDelete = (id) => {
    dispatch(deleteTransactionThunk(id));
  };
  console.log(transactions);
  return transactions.length === 0 ? ( <h1>loading</h1> ) :(
    <div>
      <h1>Transactions</h1>
      <header>
        <Link to="/add-transactions">Add Transaction</Link>
        <Link to="/edit-transactions">Edit Transactions</Link>
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
