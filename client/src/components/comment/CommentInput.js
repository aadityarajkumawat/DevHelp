import React, { useState } from "react";

const CommentInput = ({ addComment, user_id, post_id, status }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="comm">
      <input
        type="text"
        className="comment-input"
        placeholder="Add a comment..."
        onChange={handleChange}
      />
      <button
        className="comm-btn"
        type="submit"
        disabled={status}
        onClick={() => addComment(comment, user_id, post_id)}
      >
        Comment
      </button>
    </div>
  );
};

export default CommentInput;
