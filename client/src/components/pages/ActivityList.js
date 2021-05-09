import { Box, Flex, Grid } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSavedPosts,
  savePost,
  setCurrentPost,
} from "../../actions/getPostAction";
import TrendingItem from "../layout components/Trending/TrendingItem/TrendingItem";

const ActivityList = ({
  post,
  getSavedPosts,
  savePost,
  setCurrentPost,
  routing,
}) => {
  const [postsSaved, setPostsSaved] = useState([]);
  useEffect(() => {
    if (post.savedPosts.length === 0) {
      getSavedPosts();
    }
    if (postsSaved.length === 0) {
      setPostsSaved(post.savedPosts);
    }

    // eslint-disable-next-line
  }, [post.savedPosts.length]);

  // const removeThisSavedPost = (id) => {
  //   savePost(id);
  // };

  // const openThisPost = (id) => {
  //   if (post !== undefined && routing !== undefined) {
  //     setCurrentPost(id.toString());
  //     sessionStorage.setItem("postID", id.toString());
  //     routing.push("/post");
  //   }
  // };

  return (
    <Flex className="activity-list" px="1rem" w="100%" mt="2rem">
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap="calc(100% - 700px)"
        className="list-ul"
        width="100%"
      >
        {postsSaved.map((post) => (
          <Box w="350px" mb="2rem">
            <TrendingItem post={post} forComp="saved" />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, {
  getSavedPosts,
  savePost,
  setCurrentPost,
})(ActivityList);
