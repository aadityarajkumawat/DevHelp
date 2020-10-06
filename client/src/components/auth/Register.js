import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import { connect } from "react-redux";
import { register } from "../../actions/authAction";
import { removeNav } from "../../actions/navAction";
import { Link } from "react-router-dom";

import Alert from "../alerts/Alert";

// Assets import
import auth from "../../assets/auth.jpg";

const Register = ({
  auth: { isAuthenticated },
  alert,
  register,
  removeNav,
  history,
}) => {
  useEffect(() => {
    removeNav();

    // eslint-disable-next-line
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (name !== "" && email !== "" && password !== "") {
      register(user);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      setLoading(false);
    }
    setLoading(false);

    // eslint-disable-next-line
  }, [isAuthenticated, history, alert.length]);

  return (
    <Fragment>
      <div className="d-flex flex-column align-items-center justify-content-start left">
        <div className="top text-center">
          <h1>Welcome to DevHelp</h1>
          <p>
            DevHelp has a pool of highly experienced developers in their
            respective tech stacks
          </p>
          <h2>Sign Up</h2>
        </div>
        <Alert />
        <form
          className="d-flex flex-column align-items-center justify-content-start sign-up-form"
          onSubmit={onSubmit}
        >
          <div className="d-flex flex-row name-inp">
            <span className="d-flex justify-content-center align-items-center user-cont">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              className="name-inp-cls"
              name="name"
              placeholder="Name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="d-flex flex-row name-inp">
            <span className="d-flex justify-content-center align-items-center user-cont">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="text"
              className="name-inp-cls"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="d-flex flex-row name-inp">
            <span className="d-flex justify-content-center align-items-center user-cont">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              className="name-inp-cls"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <button className="btn btn-dark" type="submit">
            {loading && alert.length === 0 && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}

            <span>{loading && alert.length === 0 ? "" : "Sign Up"}</span>
          </button>
        </form>
        <p className="wrong-pg">
          Already a user?{"  "}
          <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="right">
        <img src={auth} alt="" />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { register, removeNav })(Register);
