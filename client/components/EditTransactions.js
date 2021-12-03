import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { deleteTransactionThunk } from '../store/transactions';


const EditTransactions = (props) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  const handleDelete = (id) => {
    dispatch(deleteTransactionThunk(id));
  };

  console.log(transactions);
  return transactions.length === 0 ? ( <h1>loading</h1> ) : (
    <div>
      <h1>Transactions</h1>
      <header>
        <button>Add Transaction</button>
        <Link to="/transactions">Back to Transactions</Link>
        <button>Select Category</button>
      </header>
      <main>
        {transactions.map((transaction) => (
          <div className='detailed-transaction' key={transaction.id} style={{ padding: '10px' }}>
            <div>{transaction.name}</div>
            <div>{transaction.category.categoryName}</div>
            <div>${(Math.round(transaction.amount*Math.pow(10,2))/Math.pow(10,2)).toFixed(2)}</div>
            <button onClick={() => handleDelete(transaction.id)}>delete</button>
          </div>
        ))}
      </main>
      <Prompt
        when={true}
        message="Are you sure you want to delete this transaction?"
      />
    </div>
  );
};

export default EditTransactions;
