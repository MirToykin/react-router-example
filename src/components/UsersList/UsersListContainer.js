import {connect} from 'react-redux'
import {getUsers} from "../../redux/usersList-reducer";
import UsersList from './UsersList'
import React, {useEffect} from "react";

const UsersListContainer = props => {
  useEffect(() => {
    if (!props.users.length) {
      props.getUsers();
    }
  }, [])

  return (
    <UsersList {...props}/>
  )
}

const mapStateToProps = state => {
  return {
    users: state.usersList.usersData,
    isFetching: state.usersList.isFetching,
    error: state.usersList.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);