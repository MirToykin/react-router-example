import React from "react";
import classes from './Nav.module.css'
import {NavLink} from "react-router-dom";

const Nav = props => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.linkWrapper}>
        <NavLink className={classes.nav_link} activeClassName={classes.active} to='/users'>Users</NavLink>
        <NavLink className={classes.nav_link} activeClassName={classes.active} to='/photos'>Photos</NavLink>
      </div>
    </nav>
  )
}

export default Nav;