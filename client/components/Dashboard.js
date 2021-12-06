import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import BudgetChart from '../components/ChartComponents/BudgetChart';
import { DashboardSingleTransaction } from './DashboardSingleTransaction';
import DashboardCalendar from './DashboardCalendar';
import { Link } from 'react-router-dom';

import './Dashboard.css';
//API CALLS TO /api/transactions

/**
 * COMPONENT
 */

export const Dashboard = (props) => {
  const { username } = props;

  const transactions = useSelector((state) => state.transactions);

  console.log(transactions);

  return (
    <div className={'dash-container'}>
      <div className={'left-container'}>
        <h4 className={'list-header'}>
          All Transactions
          <Link to={'/transactions'}>
            <button className={'dash-edit-button'}>+</button>
          </Link>
        </h4>

        {transactions.map((transaction) => {
          return (
            <div key={transaction.id}>
              <DashboardSingleTransaction transaction={transaction} />
            </div>
          );
        })}
      </div>
      <div className={'right-container'}>
        <div className={'half-containers'}>{BudgetChart()}</div>
        <Link to='/graphs'>
          <div className={'half-containers'}>{DashboardCalendar()}</div>
        </Link>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Dashboard);
