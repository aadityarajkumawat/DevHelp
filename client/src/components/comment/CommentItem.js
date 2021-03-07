import React from "react";
import * as S from "@chakra-ui/react";

const CommentItem = ({ username, src, comment_msg }) => {
  return (
    <S.Flex flexDir="column" justifyContent="center" h="80px" w="500px">
      <S.Flex>
        <S.Flex justifyContent="center" alignItems="center">
          <S.Image src={src} borderRadius="100%" w="40px" h="40px" />
        </S.Flex>
        <S.Flex flexDir="column" ml="20px">
          <S.Flex fontWeight="600">{username}</S.Flex>
          <S.Flex>{comment_msg}</S.Flex>
        </S.Flex>
      </S.Flex>
      <S.Divider mt="10px" />
    </S.Flex>
  );
};

export default CommentItem;
