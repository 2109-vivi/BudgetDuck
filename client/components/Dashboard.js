import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import BudgetChart from '../components/ChartComponents/BudgetChart';
import { DashboardSingleTransaction } from './DashboardSingleTransaction';
import DashboardCalendar from './DashboardCalendar';
import DashCategoricalSpendingPie from './ChartComponents/DashCategoricalSpendingPie';
import { Link } from 'react-router-dom';
import { currentMonth } from '../components/ChartComponents/assets/constants';

import './Dashboard.css';
//API CALLS TO /api/transactions

/**
 * COMPONENT
 */

export const Dashboard = (props) => {
  const [showCalendar, toggleShowCalendar] = useState(false);
  const { username } = props;

  const transactions = useSelector((state) => state.transactions);

  const handleClick = () => {
    toggleShowCalendar(!showCalendar);
  };
  return (
    <div className={'dash-container'}>
      <div className={'left-container'}>
        <h2 className={'list-header'}>
          This Month's Transactions
          <Link to={'/transactions'}>
            <button className={'dash-edit-button'}>+</button>
          </Link>
        </h2>
        <div style={{ overflow: 'auto', maxHeight: '90%' }}>
          {transactions
            .filter((item) => {
              return currentMonth == item.date.slice(5, 7);
            })
            .map((transaction) => {
              return (
                <div key={transaction.id}>
                  <DashboardSingleTransaction transaction={transaction} />
                </div>
              );
            })}
        </div>
      </div>
      <div className={'right-container'}>
        <div className={'half-containers dash-pie-chart-container'}>
          <DashCategoricalSpendingPie />
        </div>

        <div className='half-containers budget-chart-calendar-container'>
          {showCalendar ? <DashboardCalendar /> : <BudgetChart />}
        </div>
        <button className='dashboard-toggle-button' onClick={handleClick}>
          Swap View
        </button>
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
