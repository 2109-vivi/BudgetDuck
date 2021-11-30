import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store';

const Signup = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    dispatch(signup(email, password, firstName, lastName));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email
          <input name='email' type='text' />
        </label>
        <label htmlFor='password'>
          Password
          <input name='password' type='password' />
        </label>
        <label name='firstName'>
          First Name
          <input name='firstName' type='text' />
        </label>
        <label name='lastName'>
          Last Name
          <input name='lastName' type='text' />
        </label>
        <button type='submit'>Create your account</button>
      </form>
    </div>
  );
};

export default Signup;
