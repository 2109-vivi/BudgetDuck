import React from 'react';
import { PlaidLink } from 'react-plaid-link';
import { useSelector, useDispatch } from 'react-redux';
// import axios from "axios";

const ConnectPlaid = (props) => {
  const dispatch = useDispatch();

  const onSuccess = async (token, metadata) => {
    const accessToken = await dispatch(props.getAccessToken(token));
    dispatch(
      props.getTransactionsFromPlaid(accessToken, localStorage.getItem('token'))
    );
  };

  return (
    <PlaidLink
      className='plaidlinkbutton'
      style={{
        padding: '20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#9ed6eb',
      }}
      token={props.linkToken ? props.linkToken : ''}
      onSuccess={onSuccess}
    >
      <div className='plaid-link-button-text'>
        <div>Connect with Plaid </div>
        <div>and link transactions!</div>
      </div>
    </PlaidLink>
  );
};

export default ConnectPlaid;
