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
