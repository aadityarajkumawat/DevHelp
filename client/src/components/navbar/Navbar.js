import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cleanAdminPrivilages } from "../../actions/adminPrivilagesAction";
import { logout } from "../../actions/authAction";
import { initDropAnim, resetDropAnim } from "../../actions/framerAction";
import { cleanGetPostAction } from "../../actions/getPostAction";
import { cleanProfile, loadProfile } from "../../actions/profileAction";
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
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  useEffect(() => {
    if (!isEmpty(profile)) {
      loadProfile();
    }

    // eslint-disable-next-line
  }, [profile.profile.image]);

  const logMeOut = () => {
    logout();
    cleanAdminPrivilages();
    cleanGetPostAction();
    cleanProfile();
    localStorage.removeItem("token");
  };

  return navbar ? (
    <Flex
      height="60px"
      alignItems="center"
      px="50px"
      borderBottom="1px solid #a6a6a690"
    >
      <Flex w="100vw" justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Text fontSize="20px">DevHelp</Text>
        </Link>
        <Flex justifyContent="center" alignItems="center">
          {isLargerThan500 && (
            <Fragment>
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
            </Fragment>
          )}
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
                    objectFit="cover"
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
                  {isAuthenticated && (
                    <Fragment>
                      <MenuItem>
                        <Link
                          to={`/dashboard/home/user/${profile.profile._id}`}
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/compose-post">Compose Post</Link>
                      </MenuItem>
                    </Fragment>
                  )}
                  {!isLargerThan500 && (
                    <Fragment>
                      <MenuItem>
                        <Box>Search</Box>
                      </MenuItem>
                      {isAuthenticated && (
                        <MenuItem>
                          <Box>Bookmarks</Box>
                        </MenuItem>
                      )}
                      <MenuItem>
                        <Box>Upgrade</Box>
                      </MenuItem>
                    </Fragment>
                  )}
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
