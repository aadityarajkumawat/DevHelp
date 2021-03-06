import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  uploadProfilePhoto,
  loadProfile,
  toggleBackdrop,
} from "../../../actions/profileAction";
import EditProfile from "./EditProfile";
import {
  initEditProfileAnimation,
  resetEditProfileAnim,
} from "../../../actions/framerAction";
import { Flex, Image } from "@chakra-ui/react";

const Profile = ({
  auth,
  profile,
  uploadProfilePhoto,
  loadProfile,
  toggleBackdrop,
  initEditProfileAnimation,
  resetEditProfileAnim,
}) => {
  const [uploaded, setUploaded] = useState("");

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!profile.backdrop) {
      resetEditProfileAnim();
    }
  }, [profile.backdrop]);

  useEffect(() => {
    if (profile.recievedProfile) {
      setUploaded("Uploaded!");
      setTimeout(() => {
        setUploaded("");
      }, 2000);
    }
    // eslint-disable-next-line
  }, [profile.recievedProfile]);

  const editMyProfile = () => {
    initEditProfileAnimation();
    if (profile.backdrop) {
      toggleBackdrop(false);
    } else {
      toggleBackdrop(true);
    }
  };

  const addProfile = (e) => {
    const fd = new FormData();
    fd.append("profile", e.target.files[0]);
    uploadProfilePhoto(fd);
    setUploaded("Uploading...");
  };

  const uploadStyles = uploaded === "Uploading..." ? "orange" : "green";

  return (
    <React.Fragment>
      <EditProfile sta={profile.backdrop} />
      <Flex bg="red">
        <Flex>
          <Image
            src={profile.profile !== undefined && `${profile.profile.image}`}
            fallbackSrc="https://i.ibb.co/RBT25fY/default-fallback-image.png"
            style={{ width: "150px", height: "150px", borderRadius: "100%" }}
            alt="user"
          />
          <span className="change-profile-photo d-flex justify-content-center align-items-center">
            <i className="fas fa-pen"></i>
            <input
              type="file"
              name="profile"
              id="profile"
              onChange={addProfile}
            />
          </span>
        </Flex>
        <span style={{ color: uploadStyles }}>{uploaded}</span>
        <div className="info">
          <div className="in-same-line d-flex">
            <p className="name">
              <strong>
                {profile.profile.user !== undefined
                  ? profile.profile.user.name
                  : ""}
              </strong>
            </p>
            <span className="" onClick={editMyProfile}>
              <i className="fas fa-pen"></i>
            </span>
          </div>
          <div className="user-data">
            <p>{profile.profile !== undefined ? profile.profile.bio : ""}</p>
            <p>
              {profile.profile !== undefined ? profile.profile.country : ""}
            </p>
          </div>
        </div>
      </Flex>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  uploadProfilePhoto,
  loadProfile,
  toggleBackdrop,
  initEditProfileAnimation,
  resetEditProfileAnim,
})(Profile);
