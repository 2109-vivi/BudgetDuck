import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store';

const Login = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(login(email, password));
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
        <button type='submit'>Log in to your account</button>
      </form>
    </div>
  );
};

export default Login;
