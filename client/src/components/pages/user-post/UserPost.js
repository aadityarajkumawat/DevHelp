import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import TrendingItem from "../../layout components/Trending/TrendingItem/TrendingItem";
import { getUserPosts } from "../../../actions/getPostAction";
import { getAdminPrivilages } from "../../../actions/adminPrivilagesAction";
import { Flex, Heading } from "@chakra-ui/react";

const UserPost = ({
  post,
  auth,
  getUserPosts,
  routing,
  getAdminPrivilages,
}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!isEmpty(auth.user)) {
      getUserPosts(auth.user._id);
    }

    if (post.userPosts.length >= 1) {
      setPosts(post.userPosts);
    }

    // eslint-disable-next-line
  }, [auth.user, post.userPosts.length, auth.isAuthenticated]);

  useEffect(() => {
    getUserPosts(auth.user._id);
  }, [post.deletedStatus]);

  useEffect(() => {
    getAdminPrivilages(true);
    // eslint-disable-next-line
  }, []);

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  return (
    <Flex flexDir='column'>
      <Heading as="h2" fontSize='23' mb='1rem' mt='2rem'>Your Recent Posts</Heading>
      <Flex>
        {posts.length > 0 ? (
          posts.map((post) => (
            <TrendingItem
              key={post._id}
              post={post}
              by={"dashboard"}
              routing={routing}
              forComp="user-post"
            />
          ))
        ) : post.arePosts ? (
          <Fragment>
            <TrendingItem />
            <TrendingItem />
            <TrendingItem />
          </Fragment>
        ) : (
          <div>No Posts</div>
        )}
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getUserPosts, getAdminPrivilages })(
  UserPost
);
