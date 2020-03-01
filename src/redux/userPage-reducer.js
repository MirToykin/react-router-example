import ajax from "../api/api";
import makeAllSettledPolyfill from '../polyfills/promise.allSettled'

makeAllSettledPolyfill();

const USER_PAGE_FETCHING = 'USER_PAGE_FETCHING';
const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
const SET_USERS_POSTS_SUCCESS = 'SET_USERS_POSTS_SUCCESS';
const SET_USERS_COMMENTS_SUCCESS = 'SET_USERS_COMMENTS_SUCCESS';
const SET_DATA_FAILURE = 'SET_DATA_FAILURE';
const ON_COMMENTS_VISIBILITY = 'ON_COMMENTS_VISIBILITY';
const OFF_COMMENTS_VISIBILITY = 'OFF_COMMENTS_VISIBILITY';

let initialState = {
  user: {},
  usersPosts: [],
  usersComments: [],
  error: '',
  isFetching: false,
  visibleComments: []
}

const userPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PAGE_FETCHING:
      return {
        ...state,
        isFetching: action.isFething
      }
    case SET_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      }
    case SET_USERS_POSTS_SUCCESS:
      return {
        ...state,
        usersPosts: action.posts
      }
    case SET_USERS_COMMENTS_SUCCESS:
      return {
        ...state,
        usersComments: state.usersComments.length < state.usersPosts.length ? [...state.usersComments, action.comments] : [action.comments]
      }
    case SET_DATA_FAILURE:
      return {
        ...state,
        error: action.err
      }
    case ON_COMMENTS_VISIBILITY:
      return {
        ...state,
        visibleComments: [...state.visibleComments, action.postId]
      }
    case OFF_COMMENTS_VISIBILITY:
      return {
        ...state,
        visibleComments: state.visibleComments.filter(id => id !== action.postId)
      }
    default:
      return state
  }
}

const setFetching = (isFething) => {
  return {
    type: USER_PAGE_FETCHING,
    isFething
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

export const onCommentsVisibility = postId => {
  return {
    type: ON_COMMENTS_VISIBILITY,
    postId
  }
}

export const offCommentsVisibility = postId => {
  return {
    type: OFF_COMMENTS_VISIBILITY,
    postId
  }
}

export const getUserPageData = (userId) => (dispatch) => {
  dispatch(setFetching(true));
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
      response.forEach((promise => {
        if (promise.status === 'fulfilled') {
          dispatch(setUsersCommentsSuccess(promise.value.data));
        } else {
          dispatch(setUsersCommentsSuccess(promise.reason.message));
        }
      }))
      dispatch(setFetching(false));
    })
    .catch(err => {
      dispatch(setDataFailure(err.message))
      dispatch(setFetching(false));
    })
}

export default userPageReducer;
