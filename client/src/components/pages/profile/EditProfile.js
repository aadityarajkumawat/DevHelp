import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  toggleBackdrop,
  editProfile,
  setSavingStatus,
} from "../../../actions/profileAction";

const EditProfile = ({
  toggleBackdrop,
  profile,
  editProfile,
  setSavingStatus,
}) => {
  const [profileL, setProfileL] = useState({
    country: "",
    bio: "",
  });

  const { country, bio } = profileL;

  const handelSubmit = (e) => {
    e.preventDefault();
    setSavingStatus();
    editProfile(profileL);
  };

  const handleField = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setProfileL((prev) => ({ ...prev, [name]: value }));
  };

  const removeEditMode = () => {
    toggleBackdrop(false);
  };

  useEffect(() => {
    toggleBackdrop(false);
  }, [profile.profile.country, profile.profile.bio]);

  const tyle = profile.backdrop ? "block" : "none";

  return (
    <React.Fragment>
      <div className="edit-profile" style={{ display: tyle }}>
        <h2>Edit Profile</h2>
        <form onSubmit={handelSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Add a short Bio..."
              name="bio"
              value={bio}
              onChange={handleField}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={country}
              onChange={handleField}
            />
          </div>
          <div className="buttons-ss d-flex">
            <button
              type="submit"
              style={{
                backgroundColor: profile.savedStatus.color,
                color: "#fff",
                cursor: profile.savedStatus.cursor,
              }}
            >
              Save Changes
            </button>
            <button onClick={removeEditMode}>Cancel</button>
          </div>
        </form>
      </div>
      <div
        className="back-rmm"
        style={{ display: tyle }}
        onClick={removeEditMode}
      ></div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  toggleBackdrop,
  editProfile,
  setSavingStatus,
})(EditProfile);
