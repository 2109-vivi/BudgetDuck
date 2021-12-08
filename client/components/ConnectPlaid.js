import React from 'react';
import { PlaidLink } from 'react-plaid-link';
import { useSelector, useDispatch } from 'react-redux';
import { me } from '../store/auth';
import { getCategoricalBudgets } from '../store/auth';

const ConnectPlaid = (props) => {
  const dispatch = useDispatch();

  const onSuccess = async (token, metadata) => {
    const accessToken = await dispatch(props.getAccessToken(token));
    dispatch(props.getTransactionsFromPlaid(accessToken, localStorage.getItem('token')));
    dispatch(me());
  };

  const onEvent = (eventName, metadata) => {
    if (eventName == 'HANDOFF') {
      dispatch(getCategoricalBudgets(true));
    }
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
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      }}
      token={props.linkToken ? props.linkToken : ''}
      onSuccess={onSuccess}
      onEvent={onEvent}
    >
      <div className='plaid-link-button-text'>
        <div>Connect with Plaid </div>
        <div>and link transactions!</div>
      </div>
    </PlaidLink>
  );
};

export default ConnectPlaid;
