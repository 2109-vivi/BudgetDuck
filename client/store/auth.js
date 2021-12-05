import axios from 'axios';
import history from '../history';

const TOKEN = 'token';
const ACCESS_TOKEN = 'access_token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const UPDATE_BUDGET = 'UPDATE_BUDGET';
const UPDATE_INCOME = 'UPDATE_INCOME';
const GET_BUDGETS = 'GET_BUDGET';
const GET_CATEGORICAL_BUDGETS = 'GET_CATEGORICAL_BUDGETS';
const UPDATE_CATEGORICAL_BUDGET = 'UPDATE_CATEGORICAL_BUDGET';
const CLEAR_ERROR = 'CLEAR_ERROR';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});
const updateBudget = (budget) => ({
  type: UPDATE_BUDGET,
  budget,
});
const updateIncome = (income) => ({
  type: UPDATE_INCOME,
  income,
});
const getBudgets = (budget) => ({
  type: GET_BUDGETS,
  budget,
});
const setCategoricalBudgets = (categoricalBudgets) => ({
  type: GET_CATEGORICAL_BUDGETS,
  categoricalBudgets,
});
const _updateCatgoricalBudget = (categoricalBudget) => ({
  type: UPDATE_CATEGORICAL_BUDGET,
  categoricalBudget,
});

export const _clearError = () => ({ type: CLEAR_ERROR });

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

export const signup = (email, password, firstName, lastName) => async (dispatch) => {
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
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        '/api/users/budget',
        { monthlyBudget: budget },
        {
          headers: { token },
        }
      );
      const newBudget = response.data;
      dispatch(updateBudget(newBudget));
    } catch (e) {
      console.log('Failed to update Budget');
    }
  };
};

export const updateIncomeThunk = (income) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        '/api/users/income',
        { income },
        {
          headers: { token },
        }
      );
      const newIncome = response.data;
      dispatch(updateIncome(newIncome));
    } catch (e) {
      console.log('Failed to update income');
    }
  };
};

export const fetchAllBudgets = (isLoggedIn) => {
  return async (dispatch) => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/budget', {
          headers: { token },
        });
        dispatch(getBudgets(response.data));
      }
    } catch (e) {
      console.log('Failed to get budgets');
    }
  };
};

export const getCategoricalBudgets = (isLoggedIn) => {
  return async (dispatch) => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/categories');
        const categoricalBudgets = response.data;
        dispatch(setCategoricalBudgets(categoricalBudgets));
      }
    } catch (e) {
      console.log("couldn't get budgets for categories");
    }
  };
};

export const updateCategoricalBudget = (categoryId, newBudget) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/categories/${categoryId}`,
        { newBudget: Number(newBudget) },
        { headers: { token } }
      );
      const newCategoricalBudget = response.data;
      dispatch(_updateCatgoricalBudget(newCategoricalBudget));
    } catch (e) {
      console.log("Couldn't update Categorical Budget");
    }
  };
};
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case GET_BUDGETS:
      return { ...state, historicalBudgets: action.budget };
    case UPDATE_BUDGET:
      return { ...state, monthlyBudget: action.budget };
    case UPDATE_INCOME:
      return { ...state, income: action.income };
    case GET_CATEGORICAL_BUDGETS:
      return { ...state, categoricalBudgets: action.categoricalBudgets };
    case UPDATE_CATEGORICAL_BUDGET: {
      let newCategoricalBudgets = state.categoricalBudgets.map((categoricalBudget) => {
        if (categoricalBudget.id == action.categoricalBudget.categoryId) {
          return {
            ...categoricalBudget,
            budgetCategories: [{ budgetForCategory: action.categoricalBudget.budgetForCategory }],
          };
        } else {
          return categoricalBudget;
        }
      });
      return { ...state, categoricalBudgets: newCategoricalBudgets };
    }
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
