import React from 'react';
import { PlaidLink } from 'react-plaid-link';
import { useSelector } from 'react-redux';
// import axios from "axios";

const ConnectPlaid = (props) => {
  console.log(props.linkToken);

  const onExit = (error, metadata) => console.log('onExit', error, metadata);

  const onEvent = (eventName, metadata) => {
    console.log('onEvent', eventName, metadata);
    // if(metadata === 'OPEN') {
    // props.getToken()
    // }
  };

  const onSuccess = (token, metadata) => {
    //console.log('onSuccess', token, metadata);
    console.log('line 18 in connectplaid component', token);
    props.getAccessToken(token);
    const accessToken = useSelector((state) => state.accessToken);
    console.log(accessToken);
  };

  return (
    <>
      <PlaidLink
        className='CustomButton'
        style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
        token={props.linkToken ? props.linkToken : ''}
        onExit={onExit}
        onSuccess={onSuccess}
        onEvent={onEvent}
      >
        Open Link and connect your bank!
      </PlaidLink>
    </>
  );
};

export default ConnectPlaid;
