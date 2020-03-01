import React from 'react';
import './App.css';
import UsersContainer from "./components/UsersList/UsersListContainer";
import Nav from "./components/Nav/Nav";
import {Switch, Route} from 'react-router-dom'
import Photos from "./components/Photos/Photos";
import UserPageContainer from "./components/UserPage/UserPageContainer";

const App = () => {
  return (
    <div className='App'>
      <Nav/>
      <div className='main-content-wrapper'>
        <div className='main-content'>
          <Switch>
            <Route path='/users' exact component={UsersContainer}/>
            <Route path='/users/:userId?' component={UserPageContainer}/>
            <Route path='/photos' component={Photos}/>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App;
