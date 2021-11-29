import axios from 'axios';

// action types
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

// action creators
const setTransactions = (transactions) => ({
  type: SET_TRANSACTIONS,
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

// reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return [...state, ...action.transactions];
    default:
      return state;
  }
}
