import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

export const DashboardSingleTransaction = (props) => {

  return (
    <div id={props.transaction.id} className="listed-transaction">
      <p>{props.transaction.name}</p>
      <p>${props.transaction.amount}</p>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(DashboardSingleTransaction);
