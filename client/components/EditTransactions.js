import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTransactionThunk } from '../store/transactions';
import history from '../history';


const EditTransactions = (props) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  const handleEdit = (id) => {
    history.push(`/transactions/edit/${id}`);
  }

  const handleDelete = (id) => {
    dispatch(deleteTransactionThunk(id));
  };

  return transactions.length === 0 ? ( <h1>loading</h1> ) : (
    <div>
      <h1>Delete Transactions</h1>
      <header>
        <Link to="/transactions/add">Add Transaction</Link>
        <Link style={{padding: '10px'}} to="/transactions">Back to Transactions</Link>
      </header>
      <main>
        {transactions.map((transaction) => (
          <div className='detailed-transaction' key={transaction.id} style={{ padding: '10px' }}>
            <div>{transaction.name}</div>
            <div>{transaction.category.categoryName}</div>
            <div>${(Math.round(transaction.amount*Math.pow(10,2))/Math.pow(10,2)).toFixed(2)}</div>
            <Link to={{
                pathname: `/transactions/edit/${transaction.id}`,
                state: { transaction }
              }}
            >Edit</Link>
            <button onClick={() => handleDelete(transaction.id)}>delete</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EditTransactions;
