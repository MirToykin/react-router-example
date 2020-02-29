import ajax from "../api/api";

const SET_USERS_SUCCESS = 'SET_USERS_SUCCESS';
const SET_USERS_FAILURE = 'SET_USERS_FAILURE';
const USERS_LIST_FETCHING = 'USERS_LIST_FETCHING';

let initialState = {
  isFetching: false,
  usersData: [],
  error: ''
}

const usersListReducer = (state = initialState, action) => {
  switch(action.type) {
    case USERS_LIST_FETCHING:
      return {
        ...state,
        isFetching: true,
      }
    case SET_USERS_SUCCESS:
      return {
        ...state,
        usersData: action.users,
        isFetching: false
      }
    case SET_USERS_FAILURE:
      return {
        ...state,
        error: action.err,
        isFetching: false
      }
    default:
      return state;
  }
}

const fetching = () => {
  return {
    type: USERS_LIST_FETCHING
  }
}

const setUsersSuccess = (users) => {
  return {
    type: SET_USERS_SUCCESS,
    users
  }
}

const setUsersFailure = (err) => {
  return {
    type: SET_USERS_FAILURE,
    err
  }
}

export const getUsers = () => (dispatch) => {
  dispatch(fetching());
  ajax.get('users')
    .then(response => {
      let users = response.data;
      dispatch(setUsersSuccess(users))
    })
    .catch(err => {
      dispatch(setUsersFailure(err.message))
    })
}

export default usersListReducer;