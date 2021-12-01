import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getLinkToken, getAccessToken } from './store/plaid.js';
import ConnectPlaid from './components/ConnectPlaid.js';
import TransactionsContainer from './components/TransactionsContainer.js';
import PieChartComponent from './components/PieChartComponent.js';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { getTransactionsFromDatabase } from './store/transactions.js';

const App = () => {
  const dispatch = useDispatch();
  // const linkToken = useSelector((state) => state.plaid.linkToken);
  // const accessToken = useSelector((state) => state.plaid.accessToken);
  const token = localStorage.getItem('token')
  useEffect(() => {
    dispatch(getTransactionsFromDatabase(token))
  },[])

  // useEffect(() => {
  //   dispatch(getLinkToken());
  // }, []);

  return (
    <div>
      <Navbar />
      <Routes />
      {/* {accessToken == null ? (
        <ConnectPlaid
          linkToken={linkToken}
          accessToken={accessToken}
          getAccessToken={getAccessToken}
        />
      ) : (
        <Switch>
          <Route
            path='/home'
            render={(routerprops) => (
              <PieChartComponent accessToken={accessToken} />
            )}
          />
        </Switch>
      )} */}
    </div>
  );
};

export default App;
