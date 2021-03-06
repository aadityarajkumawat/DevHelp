import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cleanAdminPrivilages } from "../../actions/adminPrivilagesAction";
import { cleanGetPostAction } from "../../actions/getPostAction";
import { cleanProfile } from "../../actions/profileAction";
import { logout } from "../../actions/authAction";
import { loadProfile } from "../../actions/profileAction";
import isEmpty from "../../utils/isEmpty";
import { initDropAnim, resetDropAnim } from "../../actions/framerAction";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

const Navbar = ({
  navbar,
  auth: { isAuthenticated },
  profile,
  loadProfile,
  logout,
  cleanAdminPrivilages,
  cleanGetPostAction,
  cleanProfile,
  initDropAnim,
  resetDropAnim,
  framerAnim,
}) => {
  const dropDown = useRef(null);
  const dropCloser = useRef(null);

  useEffect(() => {
    if (!isEmpty(profile)) {
      loadProfile();
    }
  }, [profile.profile.image]);

  const openDropDown = () => {
    initDropAnim();
    dropDown.current.classList.toggle("toggle-drop-down");
    dropCloser.current.style.display = "block";
  };

  const closeDrop = () => {
    resetDropAnim();
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
    <Flex height="80px" alignItems="center" px="50px">
      <Box ref={dropCloser} onClick={closeDrop}></Box>
      <Flex w="100vw" justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Text fontSize="18px">DevHelp</Text>
        </Link>
        <Flex justifyContent="center" alignItems="center">
          <Flex justifyContent="center" alignItems="center">
            <Box ml="20px">
              <i className="fas fa-search"></i>
            </Box>
            <Box ml="20px">
              <i className="far fa-bookmark"></i>
            </Box>
          </Flex>
          <Box ml="20px">
            <Button variant="outline" h="30px">
              Upgrade
            </Button>
          </Box>
          <Box onClick={openDropDown} ml="20px">
            <Box>
              {profile.profile.image && (
                <Image
                  boxSize="40px"
                  borderRadius="100%"
                  src={profile.profile.image ? profile.profile.image : ""}
                  alt="User profile image"
                />
              )}
            </Box>
            <UnorderedList ref={dropDown} listStyleType="none" display="none">
              <ListItem>
                {!isAuthenticated && <Link to="/login">Login</Link>}
              </ListItem>
              <ListItem>
                <Link to="/dashboard/home">Dashboard</Link>
              </ListItem>
              <ListItem>
                <Link to="/compose-post">Compose Post</Link>
              </ListItem>
              <ListItem onClick={logMeOut}>
                <Link to="/">Logout</Link>
              </ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => {
  return {
    navbar: state.navbar,
    auth: state.auth,
    profile: state.profile,
    framerAnim: state.framerAnim,
  };
};

export default connect(mapStateToProps, {
  loadProfile,
  logout,
  cleanAdminPrivilages,
  cleanGetPostAction,
  cleanProfile,
  resetDropAnim,
  initDropAnim,
})(Navbar);
