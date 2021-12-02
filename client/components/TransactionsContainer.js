import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTransactionsFromPlaid } from '../store/transactions';

const TransactionsContainer = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsFromPlaid(props.accessToken));
  }, []);

console.log(props)
  return <div className='transactions-list-container'></div>;
};

export default TransactionsContainer;
