import React from "react";
import classes from './UserPage.module.css'
import UserPost from "./UserPost/UserPost";

const UserPage = props => {
  return (
    <div className={classes.userPage}>
      <div className={classes.userPageInfo}>
        <div className={classes.left}>
          <h4 className={classes.name}>{props.user.name} ({props.user.username})</h4>
          <h5 className={classes.contactsTitle}>Contacts:</h5>
          <ul>
            <li>Email: {props.user.email}</li>
            <li>Phone: {props.user.phone}</li>
            <li>Website: {props.user.website}</li>
          </ul>
        </div>
        <div className={classes.right}>
          <h5 className={classes.placeOfWorkTitle}>Place of work:</h5>
          <p>Company: {props.user.company.name}</p>
          <p>Occupation: {props.user.company.catchPhrase}</p>
          <p>Slogan: {props.user.company.bs}</p>
        </div>
      </div>
      <hr/>
      <div className={classes.posts}>
        <h5 className={classes.postsTitle}>Posts:</h5>
        {props.usersPosts.map((post, postIndex) => <UserPost
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          showComments={props.showComments}
          hideComments={props.hideComments}
          visibleComments={props.visibleComments}
          usersComments={props.usersComments}
          postIndex={postIndex}
        />)}
      </div>
    </div>
  )
}

export default UserPage