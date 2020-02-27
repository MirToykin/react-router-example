import * as axios from "axios";

const SET_USERS_SUCCESS = 'SET_USERS_SUCCESS';
const SET_USERS_FAILURE = 'SET_USERS_FAILURE';
const SET_CURRENT_USER_SUCCESS = 'SET_CURRENT_USER_SUCCESS';
const SET_CURRENT_USER_FAILURE = 'SET_CURRENT_USER_FAILURE';
const FETCHING = 'FETCHING';

let initialState = {
  isFetching: false,
  usersData: [],
  currentUser: {},
  error: ''
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING:
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
    case SET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        isFetching: false
      }
    case SET_CURRENT_USER_FAILURE:
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
    type: FETCHING
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

const setCurrentUserSuccess = (currentUser) => {
  return {
    type: SET_CURRENT_USER_SUCCESS,
    currentUser
  }
}

const setCurrentUserFailure = (err) => {
  return {
    type: SET_CURRENT_USER_FAILURE,
    err
  }
}

export const getUsers = () => (dispatch) => {
  dispatch(fetching());
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      let users = response.data;
      dispatch(setUsersSuccess(users))
    })
    .catch(err => {
      dispatch(setUsersFailure(err))
    })
}

export default usersReducer;