import React from "react";
import { connect } from "react-redux";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";

//API CALLS TO /api/transactions

/**
 * COMPONENT
 */

const dummyTransactions = [
  {
    "name": "TOYS R US",
    "amount": 500,
    "date": "2021-12-01",
    "userId": "1",
    "categoryId": "1"
},
{
  "name": "DINER",
  "amount": 500,
  "date": "2021-12-01",
  "userId": "1",
  "categoryId": "1"
},  {
  "name": "THE SHED",
  "amount": 70,
  "date": "2021-12-01",
  "userId": "1",
  "categoryId": "1"
},  {
  "name": "SUNGLASS DEPOT",
  "amount": 600,
  "date": "2021-12-01",
  "userId": "1",
  "categoryId": "1"
},  {
  "name": "TOYS R US",
  "amount": 10,
  "date": "2021-12-01",
  "userId": "1",
  "categoryId": "1"
},

]
export const Dashboard = (props) => {
  const { username } = props;

  return (
    <div className={"dash-container"}>
      <div className={"left-container"}>
        <h4>
          Todays Transactions
          <button>+</button>
        </h4>
        <div className={"listed-transaction"}>
          listed transaction
          <button>singleTransaction</button>
        </div>
        <div className={"listed-transaction"}>
          listed transaction
          <button>singleTransaction</button>
        </div>
        <div className={"listed-transaction"}>
          listed transaction
          <button>singleTransaction</button>
        </div>
        <div className={"listed-transaction"}>
          listed transaction
          <button>singleTransaction</button>
        </div>
        <div className={"listed-transaction"}>
          listed transaction
          <button>singleTransaction</button>
        </div>
      </div>

      <div className={"right-container"}>
        <div className={"half-containers"}>
          Categorical Spending Component
          <div>
            <PieChart width={300} height={300}>
              <Pie
              fill='#8884d8'/>
              <Tooltip />
            </PieChart>
          </div>
        </div>
        <div className={"half-containers"}>Budget Component</div>
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
