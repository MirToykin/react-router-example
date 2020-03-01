import React, {useEffect} from "react";
import UserPage from "./UserPage";
import {getUserPageData, offCommentsVisibility, onCommentsVisibility} from "../../redux/userPage-reducer";
import {connect} from "react-redux";

const UserPageContainer = (props) => {
  useEffect(() => {
    if (!Object.keys(props.userPage.user).length) {
      props.getUserPageData(props.match.params.userId);
    }
  },[]);
  return Object.keys(props.userPage.user).length ? <UserPage
    {...props.userPage}
    showComments={props.onCommentsVisibility}
    hideComments={props.offCommentsVisibility}
  /> : <h1>LOADING...</h1>
}

const mapStateToProps = state => {
  return {
    userPage: state.userPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPageData: userId => dispatch(getUserPageData(userId)),
    onCommentsVisibility: postId => dispatch(onCommentsVisibility(postId)),
    offCommentsVisibility: postId => dispatch(offCommentsVisibility(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer)