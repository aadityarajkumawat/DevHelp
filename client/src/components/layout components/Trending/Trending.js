import { useMediaQuery, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getTrendingPosts } from "../../../actions/trendingAction";
import TrendingItem from "./TrendingItem/TrendingItem";

const Trending = ({
  getTrendingPosts,
  trending: { loading, trendingPosts },
  routing,
  post,
}) => {
  const [posts, setPosts] = useState([]);
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
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
    <ItemWrapper>
      <Wrap
        mt={isLargerThan500 ? "0rem" : "1rem"}
        px={isLargerThan500 ? "100px" : "0"}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <WrapItem>
              <TrendingItem
                key={post._id}
                post={post}
                routing={routing}
                by={"home"}
                forComp="home-trend"
              />
            </WrapItem>
          ))
        ) : (
          <Fragment>
            <TrendingItem />
            <TrendingItem />
            <TrendingItem />
            <TrendingItem />
          </Fragment>
        )}
      </Wrap>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  div {
    ul {
      margin: 0;
      max-width: 1700px;
      justify-content: flex-start;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    trending: state.trending,
    post: state.post,
  };
};

export default connect(mapStateToProps, { getTrendingPosts })(Trending);
