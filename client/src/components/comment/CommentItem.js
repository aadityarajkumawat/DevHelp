import React from "react";

const CommentItem = ({ username, src, comment_msg }) => {
  return (
    <div className="comment-item">
      <div className="user-img">
        <img style={{ height: "30px" }} src={src} />
      </div>
      <div className='cmt-right'>
        <div>{username}</div>
        <div>{comment_msg}</div>
      </div>
    </div>
  );
};

export default CommentItem;
