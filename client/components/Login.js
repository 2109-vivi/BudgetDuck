import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store';
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

  return (
    <div className='login-component-container'>
      <div className='login-wrapper'>
        <div className='login-header'>Sign in to your account</div>
        <form onSubmit={handleSubmit} className='form'>
          <div className='login-input-wrapper'>
            <div className='label-for-login'>Email</div>
            <input name='email' type='text' />
          </div>

          <div className='login-input-wrapper'>
            <div className='label-for-login'>Password</div>
            <input name='password' type='password' />
          </div>

          {error && error.response && <div> {error.response.data} </div>}

          <div>
            <button id='login-button' type='submit'>
              Log in to your account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
