import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import history from "../history";
import { editTransactionThunk } from "../store/transactions";

const EditSingleTransaction = (props) => {
  const transaction = props.location.state.transaction
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: transaction.name,
    amount: transaction.amount,
    date: transaction.date,
    categoryId: transaction.categoryId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTransactionThunk(values, transaction.id));
    history.push('/transactions')
  }

  return (
    <div>
      <h1>Edit Transaction</h1>
      <header>
        <Link to="/transactions">Back to Transactions</Link>
        <Link style={{padding: '10px'}} to="/transactions/edit">Go Back</Link>
      </header>
      <form id="edit-transaction-form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="transaction-name">
            <h4>Transaction Name: </h4>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(e) => setValues({...values, name: e.target.value})}
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
          <select className='select' value={values.categoryId} name='priority' onChange={(e) => setValues({...values, categoryId: e.target.value})}>
            {/* filler Array number values */}
          { Array.from({length: 6}, (ele, index) => index + 1)
          .map( number => { return (
            <option key={number} value={number}>{number}</option> )})
          }
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
          <button className='edit-button' type='submit'>Edit Transaction</button>
        </p>
      </form>
    </div>
  )
}

export default EditSingleTransaction;
