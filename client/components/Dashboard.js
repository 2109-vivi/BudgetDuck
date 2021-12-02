import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import BudgetChart from "./BudgetChart";
//API CALLS TO /api/transactions

/**
 * COMPONENT
 */

export const Dashboard = (props) => {
  const { username } = props;

  const transactions = useSelector((state) => state.transactions);

  return (
    <div className={"dash-container"}>
      <div className={"left-container"}>
        <h4 className={"list-header"}>
          Todays Transactions
          <button>+</button>
          <button>...</button>
        </h4>
      {transactions.map((transaction) => {
        return (
          <div key={transaction.id}className={"listed-transaction"}>
            <p>{transaction.name} ... ${transaction.amount}</p>
          </div>
        );
      })}
    </div>
      <div className={"right-container"}>
        <div className={"half-containers"}>Categorical Spending Component</div>
        <div className={"half-containers"}>{BudgetChart()}</div>
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
