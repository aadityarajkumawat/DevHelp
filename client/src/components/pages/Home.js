import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showNav } from "../../actions/navAction";
import { clearPost } from "../../actions/getPostAction";
import Trending from "../layout components/Trending/Trending";
import PopularPosts from "../layout components/General posts/PopularPosts";
import { Box, Flex } from "@chakra-ui/react";

const Home = ({ showNav, clearPost, history }) => {
  useEffect(() => {
    showNav();
    clearPost();
    // eslint-disable-next-line
  }, []);
  return (
    <Flex w="100vw" flexDirection="column">
      <Trending routing={history} />
      <PopularPosts />
    </Flex>
  );
};

export default connect(null, { showNav, clearPost })(Home);
