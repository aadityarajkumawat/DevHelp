import React from "react";
import { connect } from "react-redux";

const UserProfile = ({ profile, post }) => {
  return (
    <div className="profile-container-main">
      <div className="profile-container">
        <div className="profile-ksi">
          <img
            src={profile.thatProfile ? profile.thatProfile.image : "#"}
            alt=""
          />
          <div className="that-user-data">
            <div className="that-user-name">
              <strong>{post.openedPost.name}</strong>
            </div>
            <div>{profile.thatProfile ? profile.thatProfile.bio : ""}</div>
            <div>{profile.thatProfile ? profile.thatProfile.country : ""}</div>
            <div className="user-posts-hh">User Posts</div>
            {post.reallyAllPosts && (
              <div className="posts-ii-list">
                {post.reallyAllPosts.map((post) => (
                  <div className="post-ii">
                    <div className="post-ii-img">
                      <img src={post.image} />
                    </div>
                    <div className="post-ii-heading">{post.heading}</div>
                    <div className="post-ii-info">
                      <div>likes: {post.likes && post.likes.length}</div>
                      <div>comment: 2</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {})(UserProfile);
