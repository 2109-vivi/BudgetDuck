import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store';
import { _clearError } from '../store/auth';

import './Login.css';

const Login = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(login(email, password));
  };

  useEffect(() => {
    dispatch(_clearError());
  }, []);

  return (
    <div className='login-component'>
      <div className='login-component-container'>
        <div className='login-wrapper'>
          <h2 className='login-header'>Sign in to your Budget Duck account</h2>
          <form onSubmit={handleSubmit} className='login-component-form'>
            <div className='login-input-wrapper'>
              <input name='email' type='text' placeholder='Email' />
            </div>

            <div className='login-input-wrapper'>
              <input name='password' type='password' placeholder='Password' />
            </div>
            {(error && error.response && (
              <div className='helper-text'> {error.response.data}</div>
            )) || (
              <div className='helper-text hidden'>
                you can't see this harhar
              </div>
            )}
            <div>
              <button id='login-button' type='submit'>
                Log in to your account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
