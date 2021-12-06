import React, { useState } from "react";
import { connect } from "react-redux";

export const DashboardSingleTransaction = (props) => {
  let [isExpanded, setExpand] = useState(false);

  return (
    <div className={"expanded-transaction-container"} onClick={() => setExpand(!isExpanded)}>
      {isExpanded ? (
        <div key={props.transaction.id} className="expand-listed-transaction">
          <h5>{props.transaction.name}</h5>
          <h5>${props.transaction.amount}</h5>
          <div>
            <h6>Category: {props.transaction.category.categoryName}</h6>
            <h6>Date: {props.transaction.date}</h6>
          </div>
        </div>
      ) : (
        <div key={props.transaction.id} className="listed-transaction">
          <h5>{props.transaction.name}</h5>
          <h5>${props.transaction.amount}</h5>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(DashboardSingleTransaction);
