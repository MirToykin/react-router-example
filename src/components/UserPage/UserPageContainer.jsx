import React, {useEffect} from "react";
import UserPage from "./UserPage";
import {getUserPageData} from "../../redux/userPage-reducer";
import {connect} from "react-redux";

const UserPageContainer = (props) => {
  useEffect(() => {
    props.getUserPageData(props.match.params.userId)
  },[]);
  return <UserPage/>
}

const mapStateToProps = state => {
  return {
    userPage: state.userPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPageData: (userId) => dispatch(getUserPageData(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer)