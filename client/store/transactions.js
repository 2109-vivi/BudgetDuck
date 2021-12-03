import axios from 'axios';

// action types
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS';
const CREATE_TRANSACTIONS = 'CREATE_TRANSACTIONS';

const DELETE_TRANSACTIONS = 'DELETE_TRANSACTIONS';

// action creators
const getTransactions = (transactions) => ({
  type: GET_TRANSACTIONS,
  transactions,
});

const createTransaction = (transactions) => ({
  type: CREATE_TRANSACTIONS,
  transactions,
});

const deleteTransaction = (transactions) => ({
  type: DELETE_TRANSACTIONS,
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
//Single Transaction Thunks

export const createTransactionThunk = (transaction) => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/transactions/', {transaction}, {
      headers: { token },
    });
    const newTransaction = response.data;
    dispatch(createTransaction(newTransaction));
  } catch (error) {
    console.log('Failed to create Transaction');
  }
}

export const deleteTransactionThunk = (id) => async(dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`/api/transactions/${id}`,
    { headers: { token }}
    );
    console.log(response);
    dispatch(deleteTransaction(response.data));
  } catch (error) {
    console.error(error);
  }
}
// reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return [...action.transactions];
    case CREATE_TRANSACTIONS:
      return [...state, action.transactions];
    case CLEAR_TRANSACTIONS:
      return [];
    case DELETE_TRANSACTIONS:
      return state.filter((transaction) => transaction.id !== action.transactions.id);
    default:
      return state;
  }
}
