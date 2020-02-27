import {connect} from 'react-redux'
import {getUsers} from "../../redux/users-reducer";
import Users from './Users'

const mapStateToProps = state => {
  return {
    users: state.usersData,
    isFetching: state.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);