import React from "react";
import classes from './Users.module.css'


class Users extends React.Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className={classes.users}>
        <h1>Users</h1>
        {this.props.isFetching ? <h1>Loading...</h1> : this.props.users.map(user => <p>{user.name}</p>)}
      </div>
    )
  }
}

export default Users;