import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import { me } from './store';
import Budget from './components/BudgetChart';
import AllTransactions from './components/AllTransactions';
import AddTransactions from './components/AddTransactions';
import EditTransactions from './components/EditTransactions';
import EditSingleTransaction from './components/EditSingleTransaction';
import UserProfile from './components/UserProfile';
import BudgetHistoryLineGraph from './components/BudgetHistoryLineGraph';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <>
            <Switch>
              <Route path='/' exact component={Dashboard} />
              <Route path='/budget' component={Budget} />
              <Route path='/questionnaire' component={Questionnaire} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/userProfile' component={UserProfile} />
              <Route path='/linegraph' component={BudgetHistoryLineGraph} />
            </Switch>
            <Switch>
              <Route exact path='/transactions' component={AllTransactions} />
              <Route
                exact
                path='/transactions/edit'
                component={EditTransactions}
              />
              <Route
                path='/transactions/edit/:id'
                component={EditSingleTransaction}
              />
              <Route path='/transactions/add' component={AddTransactions} />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
