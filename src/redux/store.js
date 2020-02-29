import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import usersListReducer from "./usersList-reducer";
import userPageReducer from "./userPage-reducer";

let reducers = combineReducers({
  usersList: usersListReducer,
  userPage: userPageReducer
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;
