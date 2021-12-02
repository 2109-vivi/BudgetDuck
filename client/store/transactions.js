import axios from 'axios';

// action types
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS';

// action creators
const getTransactions = (transactions) => ({
  type: GET_TRANSACTIONS,
  transactions,
});

export const clearTransactions = () => ({ type: CLEAR_TRANSACTIONS });

// thunks
export const getTransactionsFromPlaid = (accessToken, JWToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        '/api/plaid/transactions',
        {
          accessToken,
        },
        { headers: { token: JWToken } }
      );
      const transactions = response.data;
      dispatch(getTransactions(transactions));
    } catch (e) {
      console.log('somethign went wrong');
    }
  };
};

export const getTransactionsFromDatabase = (isLoggedIn) => {
  return async (dispatch) => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/transactions/', {
          headers: { token },
        });
        const transactions = response.data;
        dispatch(getTransactions(transactions));
      }
    } catch (e) {
      console.log('Failed to fetch Transactions');
    }
  };
};
// reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return [...state, ...action.transactions];
    case CLEAR_TRANSACTIONS:
      return [];
    default:
      return state;
  }
}
