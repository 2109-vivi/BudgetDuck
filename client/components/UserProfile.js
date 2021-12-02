import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBudgetThunk, updateIncomeThunk } from '../store'

const UserProfile = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth)
  const[budget, setBudget] = useState(userInfo.monthlyBudget)
  const[income, setIncome] = useState(userInfo.income)

const handleBudgetInputChange = (event) => {
    setBudget(event.target.value);
}
const handleIncomeInputChange = (event) => {
  setIncome(event.target.value)
}
const budgetSubmit = (evt) => {
  evt.preventDefault()
  dispatch(updateBudgetThunk(budget))
}

const incomeSubmit = (evt) => {
  evt.preventDefault()
  dispatch(updateIncomeThunk(income))
}

  return(
    <div>
      {/* {console.log(userInfo)} */}
      <h1>Hello {userInfo.firstName}!</h1>
      <h2>Personal Information:</h2>
        <h3>Email:{userInfo.email}</h3>
        <h3>FirstName: {userInfo.firstName}</h3>
        <h3>LastName: {userInfo.lastName}</h3>
      <h2>Account Information</h2>
        <h3>Current Budget:${userInfo.monthlyBudget}</h3>
        <input
          name='budget'
          type='text'
          value={budget}
          onChange={handleBudgetInputChange}
        >
        </input>
        <button onClick={budgetSubmit}>Edit Budget</button>
        <h3>Current Income: ${userInfo.income}</h3>
        <input
          name='income'
          type='text'
          value={income}
          onChange={handleIncomeInputChange}
        ></input>
        <button onClick={incomeSubmit}>Edit Income</button>
    </div>
  )
}

export default UserProfile
