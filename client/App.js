import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getLinkToken, getAccessToken } from './store/plaid.js';
import ConnectPlaid from './components/ConnectPlaid.js';
import TransactionsContainer from './components/TransactionsContainer.js';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { getTransactionsFromDatabase } from './store/transactions.js';
import { fetchAllBudgets, getCategoricalBudgets } from './store/auth.js';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // const linkToken = useSelector((state) => state.plaid.linkToken);
  // const accessToken = useSelector((state) => state.plaid.accessToken);

  useEffect(() => {
    dispatch(getTransactionsFromDatabase(isLoggedIn));
    dispatch(fetchAllBudgets(isLoggedIn));
    dispatch(getCategoricalBudgets(isLoggedIn));
  }, [isLoggedIn]);

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
