import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cleanAdminPrivilages } from "../../actions/adminPrivilagesAction";
import { cleanGetPostAction } from "../../actions/getPostAction";
import { cleanProfile } from "../../actions/profileAction";
import { logout } from "../../actions/authAction";
import { loadProfile } from "../../actions/profileAction";
import isEmpty from "../../utils/isEmpty";

const Navbar = ({
  navbar,
  auth: { isAuthenticated },
  profile,
  loadProfile,
  logout,
  cleanAdminPrivilages,
  cleanGetPostAction,
  cleanProfile,
}) => {
  const dropDown = useRef(null);
  const dropCloser = useRef(null);

  useEffect(() => {
    if (!isEmpty(profile)) {
      loadProfile();
    }
  }, [profile.profile.image]);

  const openDropDown = () => {
    dropDown.current.classList.toggle("toggle-drop-down");
    dropCloser.current.style.display = "block";
  };

  const closeDrop = () => {
    dropCloser.current.style.display = "none";
    dropDown.current.classList.remove("toggle-drop-down");
  };

  const logMeOut = () => {
    logout();
    cleanAdminPrivilages();
    cleanGetPostAction();
    cleanProfile();
    localStorage.removeItem("token");
  };

  return navbar ? (
    <div className="container nav-container">
      <div ref={dropCloser} className="drop-closer" onClick={closeDrop}></div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bd-navbar d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          DevHelp
        </Link>
        <div className="utils d-flex align-items-center">
          <div className="icons">
            <span>
              <i className="fas fa-search"></i>
            </span>
            <span>
              <i className="far fa-bookmark"></i>
            </span>
          </div>
          <div className="upgrade">
            <button className="btn btn-outline-secondary">Upgrade</button>
          </div>
          <div className="user-icon" onClick={openDropDown}>
            <div className="img">
              {profile.profile.image && (
                <img
                  src={profile.profile.image ? profile.profile.image : ""}
                  alt="User profile image"
                />
              )}
            </div>
            <ul
              ref={dropDown}
              className="drop-down-container flex-column text-center"
            >
              <li>{!isAuthenticated && <Link to="/login">Login</Link>}</li>
              <li>
                <Link to="/dashboard/home">Dashboard</Link>
              </li>
              <li>
                <Link to="/compose-post">Compose Post</Link>
              </li>
              <li onClick={logMeOut}>
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => {
  return {
    navbar: state.navbar,
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  loadProfile,
  logout,
  cleanAdminPrivilages,
  cleanGetPostAction,
  cleanProfile,
})(Navbar);
