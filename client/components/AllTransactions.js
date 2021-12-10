import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AddTransactions.css';

const AllTransactions = (props) => {
  const transactions = useSelector((state) => state.transactions);

  return transactions.length === 0 ? (
    <h1>loading</h1>
  ) : (
    <div className='transactions-component-expanded'>
      <h1>Transactions</h1>
      <header className='transactions-header'>
        <div className='transactions-header-buttons' style={{ marginBottom: '20px' }}>
          <Link className='add-transaction-button' style={{ padding: '10px' }} to='/transactions/add'>
            Add Transaction
          </Link>
          <Link className='add-transaction-button' style={{ padding: '10px' }} to='/transactions/edit'>
            Edit Transactions
          </Link>
        </div>
      </header>
      <main className='transactions-list-expanded'>
        {transactions.map((transaction) => (
          <div className='detailed-transaction' key={transaction.id} style={{ padding: '10px' }}>
            <div className='transaction-comp-exp-trans-name'>{transaction.name}</div>
            <div className='transaction-comp-exp-trans-category'>{transaction.category?.categoryName}</div>
            <div className='transaction-comp-exp-trans-date'>{transaction.date}</div>
            <div className='transaction-comp-exp-trans-amount'>
              ${(Math.round(transaction.amount * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AllTransactions;
