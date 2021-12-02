// import axios from 'axios';

// // action types
// const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
// const EDIT_TRANSACTIONS = 'EDIT_TRANSACTIONS';
// const DELETE_TRANSACTIONS = 'CLEAR_TRANSACTIONS';

// // action creators
// const addTransaction = (transactions) => ({
//   type: ADD_TRANSACTIONS,
//   transactions,
// });

// const editTransaction = (transactions) => ({
//   type: EDIT_TRANSACTIONS,
//   transactions,
// });

// const deleteTransaction = (transactions) => ({
//   type: DELETE_TRANSACTIONS,
//   transactions,
// });

// //thunks
// export const addTransactionThunk = (transactions) => async (dispatch) => {
//   try {
//     const data = await axios.post('/api/transactions', transactions);
//     dispatch(addTransaction(data));
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const editTransactionThunk = (transactions) => async(dispatch) => {
//   try {
//     const data = await axios.put(`/api/transactions/${transactions.id}`);
//     dispatch(editTransaction(data));
//   } catch (error) {
//     console.error(error);
//   }
// }

// export const deleteTransactionThunk = (id) => async(dispatch) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.delete(`/api/transactions/${id}`,
//     { headers: { token }}
//     );
//     console.log(response);
//     dispatch(deleteTransaction(response.data));
//   } catch (error) {
//     console.error(error);
//   }
// }

// // reducer
// export default function (state = [], action) {
//   switch (action.type) {
//     case ADD_TRANSACTIONS:
//       return [...state, action.transactions];
//     case EDIT_TRANSACTIONS:
//       return state.map((transaction) => {
//         if (transaction.id === action.transaction.id) {
//           return action.transactions;
//         } else {
//           return transaction;
//         }
//       });
//     case DELETE_TRANSACTIONS:
//       return state.transactions.filter((transaction) => transaction.id !== action.transaction.id);
//     default:
//       return state;
//   }
// }
