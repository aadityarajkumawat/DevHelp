import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPost,
  likePost,
  getLikedPosts,
  setCurrentPost,
} from "../../../actions/getPostAction";
import { showNav } from "../../../actions/navAction";
import { ParsedData } from "draftjs-raw-parser";
import { getThatProfileE } from "../../../actions/profileAction";
import { reallyGetAllPosts } from "../../../actions/getPostAction";
import { postComment } from "../../../actions/commentAction";
import Comment from "../../comment/Comment";
import * as S from "@chakra-ui/react";
import styled from "styled-components";
import { useToast } from "@chakra-ui/react";

const Post = ({
  post: { currentPost, openedPost, likedStatus, likedPost },
  getPost,
  likePost,
  getLikedPosts,
  auth,
  showNav,
  history,
  getThatProfileE,
  reallyGetAllPosts,
  setCurrentPost,
  comment,
}) => {
  const [lik, setLik] = useState([]);
  const [post, setPost] = useState({});
  const toast = useToast();

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

  /*
    * The effect will get the like info from backend upon
    * any change in liked status when liked: -- Likes47658936478563,
    * else Unliked834658946873, and also when the postID is recieved,
    * the postID is required to make the req to the backend
    ! Both dependencies are important and completly tested
    ? The [likedPost.length] is required bcoz ->> this handels the
    ? setLik when we actually get the filled array, else the array
    ? is empty tough the request id already been made, the liked post
    ? array the [lik] was still empty ;) 
    */
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

  /*
     * This onClick Function, request the backend to
     * register the like by user and save it to DB
     ? I have used the if check on post just to be sure
     ? whether we have got the post and handel preload
     ? events
  */
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
    getThatProfileE(openedPost.user);
    reallyGetAllPosts(openedPost.user);
    history.push("/that-user");
  };

  return (
    <React.Fragment>
      <S.Flex flexDir="column" px="400px">
        <S.Heading fontSize="80" color="gray.900">
          {post.heading}
        </S.Heading>
        <S.Flex flexDir="column">
          {openedPost.user ? (
            <S.Box
              onClick={getThatP}
              fontSize="23px"
              color="gray.700"
              mb="10px"
            >
              {post.name}
            </S.Box>
          ) : (
            <span>No id</span>
          )}
          <S.Flex alignItems="center" mb="10px">
            <S.Text fontSize="18">{"7min"}</S.Text>
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
                  : { fontSize: "25px" }
              }
            ></i>
          </S.Flex>
        </S.Flex>
        <S.Flex>
          <S.Image
            src={post && `${post.image}`}
            fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
            alt="post"
            style={{ width: "100%", height: "600px" }}
          />
        </S.Flex>
        <S.Flex mt="30px">
          {post.content && (
            <TurnIn>
              <ParsedData draftJSRawData={post.content.toString()} />
            </TurnIn>
          )}
        </S.Flex>
        <S.Divider my="60px" />
        <S.Box fontSize="24px" fontWeight="600" mb="15px">
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
