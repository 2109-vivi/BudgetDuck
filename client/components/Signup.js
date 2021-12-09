import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store';
import { _clearError } from '../store/auth';

import './Signup.css';

const Signup = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(_clearError());
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    dispatch(signup(email, password, firstName, lastName));
  };

  return (
    <div className='signup-component-container'>
      <div className='signup-wrapper'>
        <h2 style={{ textAlign: 'center' }}>Sign up for a Budget Duck account! </h2>
        <div className='signup-form-wrapper'>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='signup-form-input-wrapper'>
              <div>
                <input name='email' type='text' placeholder='Email' autocomplete='off' />
              </div>

              <div>
                <input name='password' type='password' placeholder='Password' autocomplete='off' />
              </div>

              <div>
                <input name='firstName' type='text' placeholder='First name' autocomplete='off' />
              </div>

              <div>
                <input name='lastName' type='text' placeholder='Last name' autocomplete='off' />
              </div>
            </div>
            {(error && error.response && <div className='helper-text'> {error.response.data} </div>) || (
              <div className='helper-text hidden'>you can't see this harhar</div>
            )}
            <button id='signup-button' type='submit'>
              Create your account
            </button>
          </form>{' '}
        </div>
      </div>
    </div>
  );
};

export default Signup;
