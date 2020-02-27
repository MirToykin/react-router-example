import React from 'react';
import './App.css';
import UsersContainer from "./components/Users/UsersContainer";
import Nav from "./components/Nav/Nav";

const App  = () => {
  return (
    <div className='App'>
      <Nav />
      <div className='main-content'>
        <UsersContainer/>
      </div>
    </div>
  )
}

export default App;
