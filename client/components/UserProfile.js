import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBudgetThunk, updateIncomeThunk } from '../store';
import { getLinkToken, getAccessToken } from '../store/plaid.js';
import { getTransactionsFromPlaid } from '../store/transactions';
import CategoryBudgetList from './CategoryBudgetList';
import './UserProfile.css';
import ConnectPlaid from './ConnectPlaid';
import StackedBudgetChart from './ChartComponents/StackedBudgetChart';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth);
  const [budget, setBudget] = useState(userInfo.monthlyBudget || 0);
  const [income, setIncome] = useState(userInfo.income || 0);
  const linkToken = useSelector((state) => state.plaid.linkToken);
  const accessToken = useSelector((state) => state.plaid.accessToken);

  const handleBudgetInputChange = (event) => {
    setBudget(event.target.value);
  };
  const handleIncomeInputChange = (event) => {
    setIncome(event.target.value);
  };
  const budgetSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updateBudgetThunk(budget));
  };

  const incomeSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updateIncomeThunk(income));
  };

  useEffect(() => {
    dispatch(getLinkToken());
  }, []);

  return (
    <div className='user-profile-component'>
      <div className='user-information-wrapper'>
        <div className='personal-information-wrapper'>
          <h1 style={{ marginTop: '1%' }}>Hello {userInfo.firstName}!</h1>
          <h2>Personal Information</h2>
          <h3>Email: {userInfo.email}</h3>
          <h3>First Name: {userInfo.firstName}</h3>
          <h3>Last Name: {userInfo.lastName}</h3>
        </div>
        <div className='account-information-wrapper'>
          <h2 style={{ marginTop: '2%', marginBottom: '0px' }}>Account Information</h2>
          <h3>Current Budget: ${userInfo.monthlyBudget}</h3>
          <div>
            <input name='budget' type='text' value={budget} onChange={handleBudgetInputChange}></input>
            <button onClick={budgetSubmit}>Edit Budget</button>
          </div>

          <div>
            <h3>Current Income: ${userInfo.income}</h3>

            <input name='income' type='text' value={income} onChange={handleIncomeInputChange}></input>
            <button style={{ marginBottom: '2%' }} onClick={incomeSubmit}>
              Edit Income
            </button>
          </div>
        </div>
        <div className='user-profile-plaid-container'>
          <ConnectPlaid
            linkToken={linkToken}
            accessToken={accessToken}
            getAccessToken={getAccessToken}
            getTransactionsFromPlaid={getTransactionsFromPlaid}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <CategoryBudgetList />
        <div className='user-profile-stacked-budgetchart'>
          <StackedBudgetChart />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
