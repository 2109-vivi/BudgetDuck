import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

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

<<<<<<< HEAD
export const authenticate = (email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {email, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
=======
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login', { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
>>>>>>> 7b88c4ac23983ebb66c500d1f197fe2ce47a8cb9
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
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
