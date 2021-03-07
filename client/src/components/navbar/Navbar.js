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
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
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
}) => {
  useEffect(() => {
    if (!isEmpty(profile)) {
      loadProfile();
    }
  }, [profile.profile.image]);

  const logMeOut = () => {
    logout();
    cleanAdminPrivilages();
    cleanGetPostAction();
    cleanProfile();
    localStorage.removeItem("token");
  };

  return navbar ? (
    <Flex height="80px" alignItems="center" px="50px">
      <Flex w="100vw" justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Text fontSize="20px">DevHelp</Text>
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
          <Box ml="20px">
            <Menu>
              <MenuButton className="nn">
                <Box>
                  <Image
                    boxSize="40px"
                    borderRadius="100%"
                    src={profile.profile.image ? profile.profile.image : ""}
                    alt="User profile image"
                    fallbackSrc="https://i.ibb.co/cTWq2Mm/depositphotos-171453724-stock-illustration-default-avatar-profile-icon-grey.jpg"
                  />
                </Box>
              </MenuButton>
              <Portal>
                <MenuList>
                  {!isAuthenticated && (
                    <MenuItem>
                      <Link to="/login">Login</Link>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <Link to={`/dashboard/home/user/${profile.profile._id}`}>
                      Dashboard
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/compose-post">Compose Post</Link>
                  </MenuItem>
                  {isAuthenticated && (
                    <MenuItem onClick={logMeOut}>
                      <Link to="/">Logout</Link>
                    </MenuItem>
                  )}
                </MenuList>
              </Portal>
            </Menu>
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
