import React, { useState } from "react";
import * as S from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const CommentInput = ({ addComment, user_id, post_id, status }) => {
  const [comment, setComment] = useState("");
  const toast = useToast();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const addCommentBtn = () => {
    addComment(comment, user_id, post_id);
  };

  return (
    <S.Flex>
      <S.Input
        type="text"
        className="comment-input"
        placeholder="Add a comment..."
        onChange={handleChange}
        w="450px"
      />
      <S.Button
        className="comm-btn"
        type="submit"
        disabled={status}
        onClick={addCommentBtn}
      >
        Comment
      </S.Button>
    </S.Flex>
  );
};

export default CommentInput;
