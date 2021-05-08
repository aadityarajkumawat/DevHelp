import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAdminPrivilages } from "../../../../actions/adminPrivilagesAction";
import {
  getSavedPosts,
  savePost,
  setCurrentPost,
} from "../../../../actions/getPostAction";
import OptionsMenu from "../../OptionsMenu";
import PostPlaceHolder from "../../PostPlaceHolder";

const TrendingItem = ({
  post,
  setCurrentPost,
  trending: { loading },
  routing,
  by,
  postRedu: { loadingUserPosts, savedPosts, status, savedToast },
  getAdminPrivilages,
  adminPrivilages,
  savePost,
  auth,
  getSavedPosts,
}) => {
  const [loadingUNI, setLoadingUNI] = useState(true);
  const [openOptions, setOpenOptions] = useState(false);
  const [styleForHeading, setStyleForHeading] = useState({});

  useEffect(() => {
    if (status === "" && auth.isAuthenticated) {
      getSavedPosts();
    }
    if (by === "home") {
      getAdminPrivilages(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status !== "" && auth.isAuthenticated) {
      getSavedPosts();
    }

    // eslint-disable-next-line
  }, [status]);

  const checkSavedStatus = () => {
    if (auth.isAuthenticated) {
      return (
        savedPosts
          .map((savedPostData) => savedPostData.savedID)
          .filter((oneID) => oneID === post._id.toString()).length > 0
      );
    }
  };

  const openPost = () => {
    if (post !== undefined && routing !== undefined) {
      setCurrentPost(post._id.toString());
      sessionStorage.setItem("postID", post._id.toString());
      routing.push("/post");
    }
  };

  const saveThisPost = () => {
    if (auth.isAuthenticated) {
      savePost(post._id.toString());
    } else {
      routing.push("/login");
    }
  };

  useEffect(() => {
    if (by === "home") {
      setStyleForHeading(loading ? { display: "none" } : {});
      setLoadingUNI(loading);
    } else if (by === "dashboard") {
      setStyleForHeading(loadingUserPosts ? { display: "none" } : {});
      setLoadingUNI(loadingUserPosts);
    } else {
      setStyleForHeading({});
    }

    // eslint-disable-next-line
  }, [loadingUNI, loadingUserPosts, loading]);

  const openOptionsMenu = () => {
    setOpenOptions((prev) => !prev);
  };

  const _exitOptionMode_ = () => {
    setOpenOptions((prev) => !prev);
  };

  return (
    <Flex
      flexDirection="column"
      mr="30px"
      cursor="pointer"
      rounded="md"
      border="2px solid #a6a6a690"
      w="100%"
      maxWidth="300px"
    >
      <Flex onClick={post !== undefined ? openPost : null}>
        <Image
          src={post && post.image}
          fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
          w="100%"
          h="170px"
          objectFit="cover"
          alt="post"
          borderTopLeftRadius="5px"
          borderTopRightRadius="5px"
        />
      </Flex>
      {loadingUNI && <PostPlaceHolder />}
      {post !== undefined && (
        <Flex
          style={styleForHeading}
          justifyContent="space-between"
          px="10px"
          py="5px"
          bg="#2a2c33"
        >
          <Flex flexDir="column">
            <Text onClick={openPost} fontSize="18px">
              {post.heading.length > 47
                ? post.heading.substr(0, 47) + "..."
                : post.heading}
            </Text>
            <Flex alignItems="center" mt="10px">
              <Text>{post.name}</Text>
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "100%",
                  backgroundColor: "#eee",
                  margin: "0 4px 0 4px",
                }}
              ></span>
              <Text>7 min</Text>
            </Flex>
          </Flex>
          <Box>
            <i
              onClick={saveThisPost}
              className={`fa${checkSavedStatus() ? "s" : "r"} fa-bookmark`}
            ></i>
            {adminPrivilages.postAccessibility && (
              <Fragment>
                <Box onClick={openOptionsMenu} style={{ position: "relative" }}>
                  <i className={`fas fa-ellipsis-v options--post`}></i>
                  <OptionsMenu
                    displayStatus={openOptions}
                    postID={post._id}
                    userID={post.user}
                  />
                </Box>
                <Box
                  onClick={_exitOptionMode_}
                  style={{
                    display: openOptions ? "block" : "none",
                  }}
                ></Box>
              </Fragment>
            )}
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    trending: state.trending,
    postRedu: state.post,
    adminPrivilages: state.adminPrivilages,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  setCurrentPost,
  getAdminPrivilages,
  savePost,
  getSavedPosts,
})(TrendingItem);
