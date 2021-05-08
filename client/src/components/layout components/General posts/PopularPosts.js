import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPopularPosts } from "../../../actions/getPostAction";

const PopularPosts = ({ fetchPopularPosts }) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      px={isLargerThan500 ? "100px" : "50px"}
      mt={isLargerThan500 ? "3rem" : ""}
    >
      <Heading as="h1">Popular Posts</Heading>
    </Flex>
  );
};

const mapStateToProps = (states) => ({
  posts: states.posts,
});

export default connect(mapStateToProps, { fetchPopularPosts })(PopularPosts);
