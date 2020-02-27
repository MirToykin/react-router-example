import React from "react";
import classes from './Nav.module.css'

const Nav = props => {
  return (
    <nav className={classes.navbar}>
      <p><a>Users</a></p>
      <p><a>Photos</a></p>
    </nav>
  )
}

export default Nav;