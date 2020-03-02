import React from "react";
import classes from './UsersList.module.css'
import UserItem from "./UserItem/UserItem";


const UsersList = props => {

  return (
    <div className={classes.users}>
      <h1>USERS</h1>
      {props.isFetching ? <h1>Loading...</h1> : props.users.map(user => <UserItem
        id={user.id}
        name={user.name}
        username={user.username}
        company={user.company.name}
        catchPhrase={user.company.catchPhrase}
        key={user.id}
      />)}
    </div>
  )
}

export default UsersList;