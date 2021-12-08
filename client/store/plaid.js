import axios from 'axios';
import history from '../history';

// action types
const SET_LINK_TOKEN = 'SET_LINK_TOKEN';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

// action creators
const setLinkToken = (linkToken) => ({ type: SET_LINK_TOKEN, linkToken });
const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  accessToken,
});

// thunks
export const getLinkToken = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/plaid/create_link_token');
      dispatch(setLinkToken(response.data.link_token));
    } catch (e) {
      console.log('something went wrong');
    }
  };
};

export const getAccessToken = (linkToken) => {
  return async (dispatch) => {
    try {
      if (linkToken) {
        const response = await axios.post('/api/plaid/get_access_token', {
          linkToken,
        });
        const accessToken = response.data.access_token;
        const token = localStorage.getItem('token');
        if (response) {
          await axios.put('/api/users/plaid-access-token', { accessToken }, { headers: { token } });
        }
        history.push('/dashboard');
        dispatch(setAccessToken(accessToken));
        return accessToken;
      }
      return;
    } catch (e) {
      console.log('something went wrong');
    }
  };
};

// reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_LINK_TOKEN:
      return { linkToken: action.linkToken };
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.accessToken };
    default:
      return state;
  }
}
