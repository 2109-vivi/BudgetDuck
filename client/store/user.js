import axios from 'axios'

//action types
const UPDATE_BUDGET = 'UPDATE_BUDGET'

//action creators
const updateBudget = (budget) => ({
  type: UPDATE_BUDGET,
  budget
})

//thunks

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_BUDGET:
      return {...state, monthlyBudget: action.budget};
    default:
      return state;
  }
}
