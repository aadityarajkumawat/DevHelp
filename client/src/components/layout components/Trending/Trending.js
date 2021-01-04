import React, { useState, useEffect, Fragment } from "react";
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

  return (
    <div className="container trending d-flex justify-content-around">
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trending: state.trending,
    post: state.post,
  };
};

export default connect(mapStateToProps, { getTrendingPosts })(Trending);
