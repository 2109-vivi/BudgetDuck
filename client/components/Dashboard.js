import React from "react";
import { connect } from "react-redux";

//API CALLS TO /api/transactions

/**
 * COMPONENT
 */
export const Dashboard = (props) => {
  const { username } = props;

  return (
    <div className={"dash-container"}>

      <div className={"left-container"}>
        <h4>Transactions List</h4>
        <div className={"listed-transaction"}>listed transaction
        <button>singleTransaction</button>
        </div>
        <div className={"listed-transaction"}>listed transaction
        <button>singleTransaction</button></div>
        <div className={"listed-transaction"}>listed transaction
        <button>singleTransaction</button></div>
      </div>

      <div className={"right-container"}>
        <div className={"half-containers"}>Top right graph</div>
        <div className={"half-containers"}>Bottom right graph</div>
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
