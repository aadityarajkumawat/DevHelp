import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getComments, postComment } from "../../actions/commentAction";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import * as S from "@chakra-ui/react";

const Comment = ({
  getComments,
  comment: { commenting, cmts },
  auth,
  post_id,
  postComment,
  post,
}) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (post_id) {
      getComments(post_id);
    }
  }, [commenting, post.currentPost]);

  useEffect(() => {
    sessionStorage.setItem(post_id, JSON.stringify(cmts));

    if (cmts) {
      setComments(cmts);
    }
  }, [cmts.length]);

  return (
    <S.Flex flexDir="column">
      <S.Flex>
        {auth.isAuthenticated && (
          <CommentInput
            addComment={postComment}
            user_id={auth.user._id}
            post_id={post_id}
            status={commenting}
          />
        )}
      </S.Flex>
      {comments.length > 0 ? (
        <S.Box mt="40px">
          {comments.map((cmt) => (
            <CommentItem
              username={cmt.nameOfUser}
              src={cmt.imgOfUser}
              comment_msg={cmt.comment_msg}
            />
          ))}
        </S.Box>
      ) : (
        <div></div>
      )}
    </S.Flex>
  );
};

const mapStateToProps = (state) => ({
  comment: state.comment,
  post: state.post,
});

export default connect(mapStateToProps, { getComments, postComment })(Comment);
