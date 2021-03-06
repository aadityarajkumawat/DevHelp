import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authAction";
import { connect } from "react-redux";
import Logo from "../../assets/favicon.svg";
import { toggleSlideMenu } from "../../actions/slideMenu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { cleanAdminPrivilages } from "../../actions/adminPrivilagesAction";
import { cleanGetPostAction } from "../../actions/getPostAction";
import { cleanProfile } from "../../actions/profileAction";
import * as S from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

const DashboardSideBar = ({
  logout,
  slideMenu,
  toggleSlideMenu,
  cleanAdminPrivilages,
  cleanGetPostAction,
  cleanProfile,
}) => {
  const matches = useMediaQuery("(max-width: 950px)");

  const logoutUser = () => {
    logout();
    cleanAdminPrivilages();
    cleanGetPostAction();
    cleanProfile();
    localStorage.removeItem("token");
  };

  const toggleMenu = React.useRef(null);
  const backdrop = React.useRef(null);

  React.useEffect(() => {
    if (matches && slideMenu) {
      toggleMenu.current.classList.add("open-slide-bar");
      backdrop.current.classList.remove("remove-backdrop");
    } else {
      toggleMenu.current.classList.remove("open-slide-bar");
      backdrop.current.classList.add("remove-backdrop");
    }
  }, [slideMenu, matches]);

  const removeMenu = () => {
    if (matches) {
      toggleSlideMenu(false);
      backdrop.current.classList.add("remove-backdrop");
    } else {
      backdrop.current.classList.add("remove-backdrop");
    }
  };

  const { isOpen, onOpen, onClose } = S.useDisclosure();

  return (
    <Fragment>
      <div ref={toggleMenu}>
        <Link to="/">
          <div>
            <img src={Logo} alt="" />
          </div>
        </Link>
        <Link to="/dashboard/home">Home</Link>
        <Link to="/dashboard/saved">Saved Posts</Link>
        <a href="!#">Posts</a>
        <a href="!#">Stats</a>
        <a href="!#">Plans</a>
        <a href="!#">Help</a>
        <Link to="/">Logout</Link>
      </div>
      <div ref={backdrop} className="backdrop" onClick={removeMenu}></div>

      <S.Button colorScheme="blue" onClick={onOpen}>
        Open
      </S.Button>
      <S.Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <S.DrawerOverlay>
          <S.DrawerContent>
            <S.DrawerHeader borderBottomWidth="1px">
              Basic Drawer
            </S.DrawerHeader>
            <S.DrawerBody>
              <Text>Some contents...</Text>
              <Text>Some contents...</Text>
              <Text>Some contents...</Text>
            </S.DrawerBody>
          </S.DrawerContent>
        </S.DrawerOverlay>
      </S.Drawer>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    slideMenu: state.slideMenu,
  };
};

export default connect(mapStateToProps, {
  logout,
  toggleSlideMenu,
  cleanProfile,
  cleanGetPostAction,
  cleanAdminPrivilages,
})(DashboardSideBar);
