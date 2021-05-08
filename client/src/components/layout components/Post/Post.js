import * as S from "@chakra-ui/react";
import { Skeleton, useMediaQuery, useToast } from "@chakra-ui/react";
import { ParsedData } from "draftjs-raw-parser";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { postComment } from "../../../actions/commentAction";
import {
  getLikedPosts,
  getPost,
  likePost,
  reallyGetAllPosts,
  setCurrentPost,
} from "../../../actions/getPostAction";
import { showNav } from "../../../actions/navAction";
import { getThatProfileE } from "../../../actions/profileAction";
import Comment from "../../comment/Comment";

const Post = ({
  post: { currentPost, openedPost, likedStatus, likedPost, loadingPost },
  getPost,
  likePost,
  getLikedPosts,
  auth,
  showNav,
  history,
  setCurrentPost,
  comment,
}) => {
  const [lik, setLik] = useState([]);
  const [post, setPost] = useState({});
  const toast = useToast();
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  useEffect(() => {
    showNav();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isEmpty(openedPost)) {
      if (currentPost === "") {
        setCurrentPost(sessionStorage.getItem("postID"));
        getPost(sessionStorage.getItem("postID"));
      } else {
        getPost(currentPost);
      }
    }
    if (isEmpty(post)) {
      setPost(openedPost);
    }
    // eslint-disable-next-line
  }, [currentPost, openedPost]);

  useEffect(() => {
    if (auth !== undefined && auth.user !== null) {
      getLikedPosts(auth.user._id, post._id);
      setLik(likedPost);
    }

    // eslint-disable-next-line
  }, [likedStatus, post._id, likedPost.length]);

  useEffect(() => {
    if (comment.commentToast) {
      toast({
        position: "bottom-left",
        title: "Comment Posted",
        description: "Your comment has been posted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [comment.commentToast]);

  const likeThisPost = () => {
    if (post && auth.isAuthenticated) {
      likePost(post._id);
    } else if (!auth.isAuthenticated) {
      history.push("/login");
    }
  };

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  const likedBtn = () => {
    return (
      lik.filter((likedUser) => likedUser.user === auth.user._id).length > 0
    );
  };

  const getThatP = () => {
    history.push(`/dashboard/home/${openedPost.name}/${openedPost.user}`);
  };

  console.log(openedPost);

  return (
    <React.Fragment>
      <S.Flex
        flexDir="column"
        px={isLargerThan500 ? "400px" : "50px"}
        w="100vw"
      >
        {loadingPost ? (
          <Skeleton h="80px" mt="30px"></Skeleton>
        ) : (
          <S.Heading mt="30px" color="#d6d6d6" fontSize="65px">
            {post.heading}
          </S.Heading>
        )}
        <S.Flex flexDir="column">
          {openedPost.user ? (
            <S.Box
              onClick={getThatP}
              fontSize={["15px", "23px"]}
              color="#d6d6d690"
              mb="10px"
            >
              {post.name}
            </S.Box>
          ) : (
            <Skeleton h="30px" w="300px" mt="0.5rem"></Skeleton>
          )}
          {loadingPost ? (
            <Skeleton h="30px" w="200px" my="0.5rem"></Skeleton>
          ) : (
            <S.Flex alignItems="center" mb="10px">
              <S.Text fontSize={["15", "18"]}>{"7min"}</S.Text>
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "100%",
                  backgroundColor: "#454545",
                  margin: "0 10px 0 10px",
                }}
              ></span>
              <i
                onClick={likeThisPost}
                className={`fa${likedBtn() ? "s" : "r"} fa-heart`}
                style={
                  likedBtn()
                    ? { color: "rgb(255, 0, 106)", fontSize: "25px" }
                    : { fontSize: isLargerThan500 ? "25px" : "" }
                }
              ></i>
            </S.Flex>
          )}
        </S.Flex>
        <S.Flex mt="0.5rem">
          <S.Image
            src={post && `${post.image}`}
            fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
            alt="post"
            style={{
              width: isLargerThan500 ? "100%" : "300px",
              height: isLargerThan500 ? "600px" : "auto",
            }}
          />
        </S.Flex>
        <S.Flex mt="30px">
          {post.content && (
            <TurnIn isLargerThan500>
              <ParsedData draftJSRawData={post.content.toString()} />
            </TurnIn>
          )}
        </S.Flex>
        <S.Divider my={isLargerThan500 ? "60px" : "20px"} />
        <S.Box
          fontSize={isLargerThan500 ? "24px" : "18px"}
          fontWeight="600"
          mb="15px"
        >
          Comments
        </S.Box>
        <Comment auth={auth} post_id={currentPost} />
        <S.Box h="100px"></S.Box>
      </S.Flex>
    </React.Fragment>
  );
};

const TurnIn = styled.div`
  div {
    span {
      font-size: 25px;
    }
  }

  ${(props) =>
    props.isLargerThan500 &&
    css`
      div {
        span {
          font-size: 16px;
        }
      }
    `}
`;

const mapStateToProps = (state) => {
  return {
    post: state.post,
    auth: state.auth,
    comment: state.comment,
  };
};

export default connect(mapStateToProps, {
  getPost,
  showNav,
  likePost,
  getLikedPosts,
  getThatProfileE,
  reallyGetAllPosts,
  postComment,
  setCurrentPost,
})(Post);
