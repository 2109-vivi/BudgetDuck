import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AllTransactionItems from './AllTransactionItems';

const AllTransactions = (props) => {
  const transactions = useSelector((state) => state.transactions);

  return transactions.length === 0 ? (
    <h1>loading</h1>
  ) :(
    <div>
      <h1>Transactions</h1>
      <header>
        <Link to="/add-transactions">Add Transaction</Link>
        <Link to="/edit-transactions">Edit Transactions</Link>
        <button>Select Category</button>
      </header>
      <AllTransactionItems />
    </div>
  );
};

export default AllTransactions;
