import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTransactionThunk, editTransactionThunk } from '../store/transactions';
import Modal from 'react-modal';
import './EditTransactions.css';
import history from '../history';

const EditTransactions = (props) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  const handleEdit = (id) => {
    history.push(`/transactions/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteTransactionThunk(id));
  };

  return transactions.length === 0 ? (
    <h1>loading</h1>
  ) : (
    <div className='transactions-component-expanded'>
      <h1>Edit Transactions</h1>
      <header className='transactions-header'>
        <div className='transactions-header-buttons'>
          <Link style={{ padding: '10px' }} to='/transactions/add'>
            Add Transaction
          </Link>
          <Link style={{ padding: '10px' }} to='/transactions'>
            Back to Transactions
          </Link>
        </div>
        <div className='edit-transactions-small-text-wrapper'>
          <small>(click on a transaction to edit)</small>
        </div>
      </header>
      <main className='transactions-list-expanded'>
        {transactions.map((transaction) => (
          <EditTransactionsEntry key={transaction.id} transaction={transaction} handleDelete={handleDelete} />
        ))}
      </main>
    </div>
  );
};

const EditTransactionsEntry = (props) => {
  const dispatch = useDispatch();
  const { transaction, handleDelete } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    name: transaction.name,
    amount: transaction.amount,
    date: transaction.date,
    categoryId: transaction.categoryId,
  });
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '16px',
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTransactionThunk(values, transaction.id));
    history.push('/transactions');
  };

  return (
    <div className='edit-transaction-entry-wrapper' onClick={openModal}>
      <div className='detailed-transaction' key={transaction.id} style={{ padding: '10px' }}>
        <div className='transaction-comp-exp-trans-name'>{transaction.name}</div>
        <div className='transaction-comp-exp-trans-category'>{transaction.category.categoryName}</div>
        <div className='transaction-comp-exp-trans-date'>{transaction.date}</div>
        <div className='transaction-comp-exp-trans-amount'>
          ${(Math.round(transaction.amount * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)}
        </div>
        <div className='edit-transaction-button-container'>
          <button onClick={() => handleDelete(transaction.id)}>Delete Transaction</button>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Example Modal' style={modalStyles}>
        <form id='edit-transaction-form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <h2>Edit Transaction</h2>
            <label htmlFor='transaction-name'>
              <h4>Transaction Name: </h4>
            </label>
            <input
              type='text'
              name='name'
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='transactionAmount'>
              <h4>Transaction Amount: </h4>
            </label>
            <input
              type='number'
              name='amount'
              value={values.amount}
              placeholder='0.00'
              step='0.01'
              min='0'
              onChange={(e) => setValues({ ...values, amount: +e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='transactionCategory'>
              <h4>Category: </h4>
            </label>
            <select
              className='select'
              value={values.categoryId}
              name='priority'
              onChange={(e) => setValues({ ...values, categoryId: +e.target.value })}
            >
              {/* filler Array number values */}
              {Array.from({ length: 6 }, (ele, index) => index + 1).map((number) => {
                return (
                  <option key={number} value={number}>
                    {number}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor='transactionDate'>
              <h4>Transaction Date: </h4>
            </label>
            <input
              type='date'
              name='date'
              value={values.date}
              onChange={(e) => setValues({ ...values, date: e.target.value })}
            />
          </div>
          <p>
            <button className='edit-button' type='submit'>
              Edit Transaction
            </button>
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default EditTransactions;
