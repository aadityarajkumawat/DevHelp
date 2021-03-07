import React, { useState, useEffect, Fragment } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import { connect } from "react-redux";
import { getTrendingPosts } from "../../../actions/trendingAction";
import TrendingItem from "./TrendingItem/TrendingItem";

const Trending = ({
  getTrendingPosts,
  trending: { loading, trendingPosts },
  routing,
  post,
}) => {
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (trendingPosts.length === 0) {
      getTrendingPosts();
    }
    if (posts.length === 0) {
      setPosts(trendingPosts);
    }

    // eslint-disable-next-line
  }, []);

  console.log("cool");

  useEffect(() => {
    if (trendingPosts.length === 0) {
      getTrendingPosts();
    }
    if (posts.length === 0) {
      setPosts(trendingPosts);
    }

    // eslint-disable-next-line
  }, [trendingPosts.length, post.uploadedStatus]);
  useEffect(() => {
    if (post.savedToast) {
      toast({
        position: "bottom-left",
        title: post.status[2] === "s" ? "Saved Post" : "Unsaved Post",
        description:
          post.status[2] == "s"
            ? "Post has been saved"
            : "Post has been removed from saved collection",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [post.savedToast]);

  return (
    <Flex justifyContent="center" mt="0rem">
      {posts.length > 0 ? (
        posts.map((post) => (
          <TrendingItem
            key={post._id}
            post={post}
            routing={routing}
            by={"home"}
            forComp="home-trend"
          />
        ))
      ) : (
        <Fragment>
          <TrendingItem />
          <TrendingItem />
          <TrendingItem />
          <TrendingItem />
        </Fragment>
      )}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    trending: state.trending,
    post: state.post,
  };
};

export default connect(mapStateToProps, { getTrendingPosts })(Trending);
