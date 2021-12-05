import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store';
import './Signup.css';

const Signup = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

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
        <h2>Sign up for a Budget Duck account! </h2>
        <div>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email</label>
              <input name='email' type='text' />
            </div>

            <div>
              <label htmlFor='password'>Password</label>
              <input name='password' type='password' />
            </div>

            <div>
              <label name='firstName'>First Name</label>
              <input name='firstName' type='text' />
            </div>

            <div>
              <label name='lastName'>Last Name</label>
              <input name='lastName' type='text' />
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>{' '}
        </div>
        <button id='signup-button' type='submit'>
          Create your account
        </button>
      </div>
    </div>
  );
};

export default Signup;
