import React from "react";
import classes from './PostComment.module.css'

const PostComment = ({name, body, email}) => {
  return (
    <div className={classes.comment}>
      <p className={classes.title}>{name}</p>
      <p className={classes.body}>{body}</p>
      <p className={classes.email}>{email}</p>
    </div>
  )
}

export default PostComment