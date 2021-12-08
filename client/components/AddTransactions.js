import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const [errors, setErrors] = useState({});

  async function handleValidation() {
    const { name, amount, date } = values;
    let errorMessages = {};
    let formValidation = true;

    //name check
    if (!name || name.length === 0) {
      formValidation = false;
      errorMessages.name = 'Name is required';
    }
    //amount check
    if (!amount || amount.length === 0) {
      formValidation = false;
      errorMessages.amount = 'Amount is required';
    } else if (isNaN(amount)) {
      formValidation = false;
      errorMessages.amount = 'Amount must be a number';
    } else if (amount < 0) {
      formValidation = false;
      errorMessages.amount = 'Amount must be positive';
    }

    //date check
    if (!date || date.length === 0) {
      formValidation = false;
      errorMessages.date = 'Date is required';
    }
    return formValidation;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = await handleValidation();
    if(!valid){
      toast.error('Please fill out all fields correctly');
    } else {
      dispatch(createTransactionThunk(values));
      history.push('/transactions');
      toast('Transaction added!');
    }
  }

  return (
  <div className='app-container'>
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
        <ToastContainer />
  </div>
  );
}

export default AddTransactions;
