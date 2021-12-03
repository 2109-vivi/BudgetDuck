import axios from 'axios';
import history from '../history';

const TOKEN = 'token';
const ACCESS_TOKEN = 'access_token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const UPDATE_BUDGET = 'UPDATE_BUDGET'
const UPDATE_INCOME = 'UPDATE_INCOME'
const GET_BUDGETS = 'GET_BUDGET'

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({
  type: SET_AUTH,
  auth
});
const updateBudget = (budget) => ({
  type: UPDATE_BUDGET,
  budget
});
const updateIncome = (income) => ({
  type: UPDATE_INCOME,
  income
});
const getBudgets = (budget) => ({
  type: GET_BUDGETS,
  budget
});

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login', { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push('/');
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const signup =
  (email, password, firstName, lastName) => async (dispatch) => {
    try {
      const res = await axios.post('/auth/signup', {
        email,
        password,
        firstName,
        lastName,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      history.push('/questionnaire');
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(ACCESS_TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const updateBudgetThunk = (budget) => {
  return async (dispatch) => {
    try{
      const token = localStorage.getItem('token');
      const response  = await axios.put('/api/users/budget',{monthlyBudget: budget},{
        headers: { token }})
      const newBudget = response.data
      dispatch(updateBudget(newBudget))
    }
    catch(e){
      console.log("Failed to update Budget")
    }
  }
}

export const updateIncomeThunk = (income) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/users/income', {income}, {
        headers: {token}})
      const newIncome = response.data
      dispatch(updateIncome(newIncome))
    }
    catch(e) {
      console.log("Failed to update income")
    }
  }
}

export const fetchAllBudgets = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users/budget', {
        headers: {token}})
        dispatch(getBudgets(response.data))
    }
    catch(e) {
      console.log("Failed to get budgets")
    }
  }
}
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case GET_BUDGETS:
      return {...state, historicalBudgets: action.budget}
    case UPDATE_BUDGET:
      return {...state, monthlyBudget: action.budget}
    case UPDATE_INCOME:
      return {...state, income: action.income}
    default:
      return state;
  }
}
