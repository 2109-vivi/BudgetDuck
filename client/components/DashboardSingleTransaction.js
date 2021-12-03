import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

export const DashboardSingleTransaction = (props) => {

  return (
    <div key={props.transaction.id} className="listed-transaction">
      <h5>{props.transaction.name}</h5>
      <h5>${props.transaction.amount}</h5>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(DashboardSingleTransaction);
