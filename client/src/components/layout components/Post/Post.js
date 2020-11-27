import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPost,
  likePost,
  getLikedPosts,
} from "../../../actions/getPostAction";
import { showNav } from "../../../actions/navAction";

// Parse HTML string to HTML
import PostHolder from "./Post-Placeholder/PostHolder";
import { parseJsonStringToContent } from "../../../utils/parseJsonStringToContent";

const Post = ({
  post: { currentPost, openedPost, loadingPost, likedStatus, likedPost },
  getPost,
  likePost,
  getLikedPosts,
  auth,
  showNav,
  history,
}) => {
  const [lik, setLik] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    showNav();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isEmpty(openedPost)) {
      if (currentPost === "") {
        getPost(sessionStorage.getItem("postID"));
      } else {
        console.log("is it so");
        console.log("trying this", sessionStorage.getItem("postID"));

        getPost(currentPost);
      }
    }
    if (isEmpty(post)) {
      setPost(openedPost);
    }

    // eslint-disable-next-line
  }, [currentPost, openedPost]);

  /*
    * The effect will get the like info from backend upon
    * any change in liked status when liked: -- Likes47658936478563,
    * else Unliked834658946873, and also when the postID is recieved,
    * the postID is required to make the req to the backend
    ! Both dependencies are important and completly tested
    ? The [likedPost.length] is required bcoz ->> this handels the
    ? setLik when we actually get the filled array, else the array
    ? is empty tough the request id already been made, the liked post
    ? array the [lik] was still empty ;) 
    */
  useEffect(() => {
    if (auth !== undefined && auth.user !== null) {
      getLikedPosts(auth.user._id, post._id);
      setLik(likedPost);
    }

    // eslint-disable-next-line
  }, [likedStatus, post._id, likedPost.length]);

  /*
     * This onClick Function, request the backend to
     * register the like by user and save it to DB
     ? I have used the if check on post just to be sure
     ? whether we have got the post and handel preload
     ? events
     */
  const likeThisPost = () => {
    if (post && auth.isAuthenticated) {
      likePost(post._id);
    } else if (!auth.isAuthenticated) {
      history.push("/login");
    }
  };

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  const likedBtn = () => {
    return (
      lik.filter((likedUser) => likedUser.user === auth.user._id).length > 0
    );
  };

  const loadingStyles = loadingPost ? { display: "none" } : {};

  return (
    <React.Fragment>
      {loadingPost && <PostHolder />}
      <div className="post-container-one" style={loadingStyles}>
        <h1 className="post-heading">{post.heading}</h1>
        <div className="user-p d-flex align-items-center">
          <span>{post.name}</span>
          <div className="dot-i"></div>
          <span>{"6"} min</span>
          <i
            onClick={likeThisPost}
            className={`fa${likedBtn() ? "s" : "r"} fa-heart`}
            style={likedBtn() ? { color: "rgb(255, 0, 106)" } : {}}
          ></i>
        </div>
        <div className="img-post-container">
          <img src={post !== undefined ? `${post.image}` : null} alt="" />
        </div>
        <p className="nn-new">
          {post.content && parseJsonStringToContent(post.content.toString())}
        </p>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getPost,
  showNav,
  likePost,
  getLikedPosts,
})(Post);
