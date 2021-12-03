import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearTransactions } from '../store/transactions';

import './Navbar.css';

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className='navbar'>
    <nav>
      <img src='/assets/logo.png' style={{ height: '100px' }}/>
      {isLoggedIn ? (
        <>
          {/* The navbar will show these links after you log in */}
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/budget">Budget</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/settings">Settings</Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearTransactions());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
