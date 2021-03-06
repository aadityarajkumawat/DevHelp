import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";
import { removeNav } from "../../actions/navAction";
import { loadProfile } from "../../actions/profileAction";
import { Link } from "react-router-dom";

// Assets import
import auth from "../../assets/auth.jpg";
import Alert from "../alerts/Alert";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";

const Login = ({
  auth: { isAuthenticated },
  login,
  alert,
  removeNav,
  history,
  loadProfile,
}) => {
  useEffect(() => {
    removeNav();
    // eslint-disable-next-line
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setLoading(true);
    login(user);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      setLoading(false);
      loadProfile();
    }
    setLoading(false);
    loadProfile();

    // eslint-disable-next-line
  }, [isAuthenticated, history, alert.length]);

  return (
    <Fragment>
      <Box w="calc(100% - 700px)">
        <Flex alignItems="center" flexDirection="column" pt="2.5rem">
          <Heading as="h1">Welcome to DevHelp</Heading>
          <Text color="#00000080">
            DevHelp has a pool of highly experienced developers in their
            respective tech stacks
          </Text>
          <Heading as="h2" fontSize="25px" py="20px" mt="100px">
            Login
          </Heading>
        </Flex>
        <Alert />
        <Flex flexDirection="column" alignItems="center">
          <HStack mb="1rem" w="450px">
            <Box>
              <i className="fas fa-envelope"></i>
            </Box>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </HStack>
          <HStack mb="1rem" w="450px">
            <Box>
              <i className="fas fa-lock"></i>
            </Box>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </HStack>
          <Button
            isLoading={loading}
            loadingText="Logging In"
            colorScheme="blackAlpha"
            w="450px"
            type="submit"
            onClick={onSubmit}
          >
            Login
          </Button>
        </Flex>
        <Flex justifyContent="center">
          New user?{"  "}
          <Link to="sign-up">
            <Text ml="5px" color="#0066ff">
              Sign Up
            </Text>
          </Link>
        </Flex>
      </Box>
      <Box>
        <Image
          src={auth}
          alt="random"
          width="700px"
          height="100vh"
          maxWidth="700px"
        />
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { login, removeNav, loadProfile })(
  Login
);
