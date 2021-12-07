import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { createTransactionThunk } from '../store/transactions';
import history from '../history';

const AddTransactions = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.auth.categoricalBudgets);

  const [values, setValues] = useState({
    name: '',
    amount: '',
    date: '',
    categoryId: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTransactionThunk(values));
    history.push('/transactions');
  }

  return (
  <div>
    <form id='transaction-form' onSubmit={(e)=>{handleSubmit(e)}}>
      <h1>Create a Transaction</h1>
      <div>
        <div>
          <label htmlFor='transactionName'>
            <h4>Transaction Name: </h4>
          </label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <span className="error">{}</span>
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
            onChange={(e) => setValues({ ...values, amount: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='transactionCategory'>
            <h4>Category: </h4>
          </label>
          <select className='select' name='priority' onChange={(e) => setValues({...values, categoryId: e.target.value})}>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
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
          <button className='create-button' type='submit'>Create Transaction</button>
        </p>
        <Link to={`/transactions`}>Back</Link>
      </div>
    </form>
  </div>
  );
}

export default AddTransactions;
