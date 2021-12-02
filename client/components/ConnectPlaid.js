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
    <>
      <PlaidLink
        className='CustomButton'
        style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
        token={props.linkToken ? props.linkToken : ''}
        onSuccess={onSuccess}
      >
        Connect with Plaid and link transactions!
      </PlaidLink>
    </>
  );
};

export default ConnectPlaid;
