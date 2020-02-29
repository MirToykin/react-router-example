import ajax from "../api/api";
import makeAllSettledPolyfill from '../polyfills/promise.allSettled'

makeAllSettledPolyfill();

const USER_PAGE_FETCHING = 'USER_PAGE_FETCHING';
const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
const SET_USERS_POSTS_SUCCESS = 'SET_USERS_POSTS_SUCCESS';
const SET_USERS_COMMENTS_SUCCESS = 'SET_USERS_COMMENTS_SUCCESS';
const SET_DATA_FAILURE = 'SET_DATA_FAILURE';
const SET_SAME_USER = 'SET_SAME_USER';

let initialState = {
  user: {},
  usersPosts: [],
  usersComments: [],
  error: '',
  isFetching: false,
  isTheSameUser: false
}

const userPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PAGE_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case SET_SAME_USER:
      return {
        ...state,
        isTheSameUser: action.isTheSame
      }
    case SET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isFetching: false
      }
    case SET_USERS_POSTS_SUCCESS:
      return {
        ...state,
        usersPosts: action.posts,
        isFetching: false
      }
    case SET_USERS_COMMENTS_SUCCESS:
      debugger
      return {
        ...state,
        usersComments: state.isTheSameUser ? [...state.usersComments, action.comments] : [action.comments],
        isFetching: false
      }
    case SET_DATA_FAILURE:
      return {
        ...state,
        error: action.err,
        isFetching: false
      }
    default:
      return state
  }
}

const setFetching = () => {
  return {
    type: USER_PAGE_FETCHING
  }
}

const setSameUser = (isTheSame) => {
  return {
    type: SET_SAME_USER,
    isTheSame
  }
}

const setUserSuccess = user => {
  return {
    type: SET_USER_SUCCESS,
    user
  }
}

const setUsersPostsSuccess = posts => {
  return {
    type: SET_USERS_POSTS_SUCCESS,
    posts
  }
}

const setUsersCommentsSuccess = comments => {
  return {
    type: SET_USERS_COMMENTS_SUCCESS,
    comments
  }
}

const setDataFailure = err => {
  return {
    type: SET_DATA_FAILURE,
    err
  }
}

export const getUserPageData = (userId) => (dispatch) => {
  dispatch(setFetching());
  ajax.get('users/' + userId)
    .then(response => {
      let user = response.data;
      dispatch(setUserSuccess(user));
    })
    .then(() => ajax.get('posts?userId=' + userId))
    .then(response => {
      let posts = response.data;
      dispatch(setUsersPostsSuccess(posts));
      return Promise.allSettled(posts.map((post) => {
        return ajax.get('comments?postId=' + post.id)
      }))
    })
    .then(response => {
      dispatch(setSameUser(true))
      response.forEach((promise => {
        if (promise.status === 'fulfilled') {
          dispatch(setUsersCommentsSuccess(promise.value.data));
        } else {
          dispatch(setUsersCommentsSuccess(promise.reason.message));
        }
      }))
      dispatch(setSameUser(false))
    })
    .catch(err => {
      dispatch(setDataFailure(err.message))
    })
}

export default userPageReducer;
