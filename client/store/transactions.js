import axios from 'axios';

// action types
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

// action creators
const setTransactions = (transactions) => ({
  type: SET_TRANSACTIONS,
  transactions,
});

const getTransactions = (transactions) => ({
  type: GET_TRANSACTIONS,
  transactions,
});
// thunks
export const getTransactionsFromPlaid = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/plaid/transactions', {
        accessToken,
      });
      let transactions = response.data;
      dispatch(setTransactions(transactions));
    } catch (e) {
      console.log('somethign went wrong');
    }
  };
};

export const getTransactionsFromDatabase= (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/transactions/getTransactions', {headers: {token}})
      dispatch(getTransactions(response.data))
    }
    catch(e){
      console.log("Failed to fetch Transactions")
    }
  }
}
// reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return [...state, ...action.transactions];
    case GET_TRANSACTIONS:
      return action.transactions
    default:
      return state;
  }
}
