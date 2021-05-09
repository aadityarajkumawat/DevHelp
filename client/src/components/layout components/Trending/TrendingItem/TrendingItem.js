import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAdminPrivilages } from "../../../../actions/adminPrivilagesAction";
import {
  deletePost,
  getSavedPosts,
  savePost,
  setCurrentPost,
} from "../../../../actions/getPostAction";
import PostPlaceHolder from "../../PostPlaceHolder";

const TrendingItem = ({
  deletePost,
  post,
  setCurrentPost,
  trending: { loading },
  routing,
  by,
  postRedu: { loadingUserPosts, savedPosts, status },
  getAdminPrivilages,
  adminPrivilages,
  savePost,
  auth,
  getSavedPosts,
  forComp,
}) => {
  const [loadingUNI, setLoadingUNI] = useState(true);
  const [styleForHeading, setStyleForHeading] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <Flex
      flexDirection="column"
      mr="30px"
      cursor="pointer"
      rounded="md"
      border="2px solid #a6a6a690"
      w="350px"
      maxWidth="350px"
    >
      <Flex
        onClick={post !== undefined ? openPost : null}
        w="350px"
        h="170px"
        maxWidth="350px"
      >
        {!imageLoaded && <Skeleton w="350px" h="170px" maxW="346px"></Skeleton>}
        <Image
          src={post && post.image}
          fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
          w="346px"
          h="170px"
          objectFit="cover"
          alt="post"
          borderTopLeftRadius="5px"
          borderTopRightRadius="5px"
          onLoad={() => setImageLoaded(true)}
          display={imageLoaded ? "" : "none"}
          maxWidth="346px"
        />
      </Flex>
      {loadingUNI && <PostPlaceHolder />}
      {post !== undefined ? (
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
              {forComp !== "saved" && (
                <Fragment>
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
                </Fragment>
              )}
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" alignSelf="center">
            <i
              onClick={saveThisPost}
              className={`fa${checkSavedStatus() ? "s" : "r"} fa-bookmark`}
            ></i>
            {adminPrivilages.postAccessibility && (
              <Fragment>
                <Flex mt="10px" className="admin-post-drop">
                  <Menu isLazy>
                    <MenuButton
                      as={Flex}
                      w="20px"
                      h="20px"
                      justifyContent="center"
                      alignItems="center"
                      _hover={{ bg: "#ffffff80" }}
                    >
                      <HamburgerIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => deletePost(post._id)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Fragment>
            )}
          </Flex>
        </Flex>
      ) : (
        <Flex
          style={styleForHeading}
          justifyContent="space-between"
          px="10px"
          py="5px"
          bg="#2a2c33"
          flexDir="column"
        >
          <Skeleton my="0.2rem" h="25px" w="240px"></Skeleton>
          <Skeleton my="0.2rem" h="20px" w="100px"></Skeleton>
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
  deletePost,
})(TrendingItem);
