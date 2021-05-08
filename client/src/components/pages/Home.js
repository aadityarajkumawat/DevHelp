import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearPost } from "../../actions/getPostAction";
import { showNav } from "../../actions/navAction";
import PopularPosts from "../layout components/General posts/PopularPosts";
import Trending from "../layout components/Trending/Trending";

const Home = ({ showNav, clearPost, history }) => {
  useEffect(() => {
    showNav();
    clearPost();
    // eslint-disable-next-line
  }, []);
  return (
    <Flex w="100vw" flexDirection="column" mt="2rem">
      <Trending routing={history} />
      <PopularPosts />
    </Flex>
  );
};

export default connect(null, { showNav, clearPost })(Home);
