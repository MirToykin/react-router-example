import React from "react";
import classes from './UserItem.module.css'
import {NavLink} from "react-router-dom";

const UserItem = props => {
  return (
    <div className={classes.userItem}>
      <div className={classes.left}>
        <h4 className={classes.userName}>{props.name} ({props.username})</h4>
        <p className={classes.city}></p>
        <NavLink to={`/users/${props.id}`}>Show profile</NavLink>
      </div>
      <div className={classes.right}>
        <h5 className={classes.company}>{props.company}</h5>
        <p className={classes.catchPhrase}>{props.catchPhrase}</p>
      </div>
    </div>
  )
}

export default UserItem;