import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import usersReducer from "./users-reducer";

let store = createStore(usersReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;
