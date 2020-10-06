import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showNav } from "../../actions/navAction";
import { clearPost } from "../../actions/getPostAction";
import Trending from "../layout components/Trending/Trending";
import PopularPosts from "../layout components/General posts/PopularPosts";

const Home = ({ showNav, clearPost, history }) => {
  useEffect(() => {
    showNav();
    clearPost();
    console.log("Hey I load everytime");
    // eslint-disable-next-line
  }, []);
  return (
    <div className="home d-flex flex-column">
      <Trending routing={history} />
      <PopularPosts />
    </div>
  );
};

export default connect(null, { showNav, clearPost })(Home);
