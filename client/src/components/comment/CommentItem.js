import React from "react";

const CommentItem = ({ username, src, comment_msg }) => {
  return (
    <div className="comment-item">
      <div className="user-img">
        <img src={src} />
      </div>
      <div>{username}</div>
      <div>{comment_msg}</div>
    </div>
  );
};

export default CommentItem;
