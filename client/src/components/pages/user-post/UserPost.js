import { Flex, Grid, Heading } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAdminPrivilages } from "../../../actions/adminPrivilagesAction";
import { getUserPosts } from "../../../actions/getPostAction";
import TrendingItem from "../../layout components/Trending/TrendingItem/TrendingItem";

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

    // eslint-disable-next-line
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
    <Flex flexDir="column" px="1rem">
      <Heading as="h2" fontSize="23" mb="1rem" mt="2rem">
        Your Recent Posts
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
      </Grid>
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
