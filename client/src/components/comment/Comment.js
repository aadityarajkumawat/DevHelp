import * as S from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  const [comments, setComments] = useState([]);
  const [i] = S.useMediaQuery("(min-width: 500px)");

  useEffect(() => {
    if (post_id) {
      getComments(post_id);
    }

    // eslint-disable-next-line
  }, [commenting, post.currentPost]);

  useEffect(() => {
    sessionStorage.setItem(post_id, JSON.stringify(cmts));

    if (cmts) {
      setComments(cmts);
    }

    // eslint-disable-next-line
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
        <S.Box mt={i ? "40px" : ""}>
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
