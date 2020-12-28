import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getComments, postComment } from "../../actions/commentAction";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

const Comment = ({
  getComments,
  comment: { commenting, cmts },
  auth,
  post_id,
  postComment,
  post,
}) => {
  useEffect(() => {
    getComments(post_id);
  }, [commenting, post.currentPost]);

  return (
    <div>
      <div>
        {auth.isAuthenticated && (
          <CommentInput
            addComment={postComment}
            user_id={auth.user._id}
            post_id={post_id}
            status={commenting}
          />
        )}
      </div>
      {cmts.length > 0 ? (
        <div>
          {cmts.map((cmt) => (
            <CommentItem
              username={cmt.nameOfUser}
              src={cmt.imgOfUser}
              comment_msg={cmt.comment_msg}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  comment: state.comment,
  post: state.post,
});

export default connect(mapStateToProps, { getComments, postComment })(Comment);
