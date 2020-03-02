import React from "react";
import classes from './UserPost.module.css'
import PostComment from "./PostComment/PostComment";

const UserPost = ({title, body, id, showComments, hideComments, visibleComments, usersComments, postIndex}) => {
  return (
    <div className={classes.post}>
      <h6 className={classes.postTitle}>{title}</h6>
      <p>{body}</p>
      {visibleComments.some(postId => postId === id) ?
        <button onClick={() => hideComments(id)} className={classes.changeCommentsVis}>Hide comments</button> :
        <button onClick={() => showComments(id)} className={classes.changeCommentsVis}>Show comments</button>}
      {visibleComments.some(postId => postId === id) ?
        <div className={classes.comments}>
          <p className={classes.commentTitle}>Comments:</p>
          {usersComments[postIndex].map(comment => {
            return <PostComment
              name={comment.name}
              body={comment.body}
              email={comment.email}
              key={comment.id}
            />
          })}
        </div> :
        null}
    </div>
  )
}

export default UserPost;