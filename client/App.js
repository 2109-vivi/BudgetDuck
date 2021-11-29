import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkToken, getAccessToken } from './store/plaid.js';
import ConnectPlaid from './components/ConnectPlaid.js';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  const dispatch = useDispatch();
  const linkToken = useSelector((state) => state.linkToken);
  const accessToken = useSelector((state) => state.accessToken);

  useEffect(() => {
    dispatch(getLinkToken());
  }, []);

  return (
    <div>
      {/* <Navbar />
      <Routes /> */}
      <ConnectPlaid
        linkToken={linkToken}
        accessToken={accessToken}
        getAccessToken={getAccessToken}
      />
    </div>
  );
};

export default App;
