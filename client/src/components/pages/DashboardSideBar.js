import * as S from "@chakra-ui/react";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cleanAdminPrivilages } from "../../actions/adminPrivilagesAction";
import { logout } from "../../actions/authAction";
import { cleanGetPostAction } from "../../actions/getPostAction";
import { cleanProfile } from "../../actions/profileAction";
import { toggleSlideMenu } from "../../actions/slideMenu";
import Logo from "../../assets/favicon.svg";

const DashboardSideBar = ({}) => {
  const { isOpen, onOpen, onClose } = S.useDisclosure();

  return (
    <Fragment>
      {/* <S.Box onClick={onOpen} mr="4">
        <S.Icon as={MdMenu} fontSize="3xl" />
      </S.Box> */}
      <S.Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <S.DrawerOverlay>
          <S.DrawerContent>
            <S.DrawerHeader borderBottomWidth="1px">
              <S.Flex justifyContent="flex-start" alignItems="center">
                <Link to="/">
                  <div>
                    <img src={Logo} alt="" />
                  </div>
                </Link>
                <S.Text ml="1rem">Devhelp</S.Text>
              </S.Flex>
            </S.DrawerHeader>
            <S.DrawerBody>
              <S.Flex flexDirection="column" pt="5">
                <S.Box mb="1rem" fontSize="20">
                  <Link to="/dashboard/home">Home</Link>
                </S.Box>
                <S.Box mb="1rem" fontSize="20">
                  <Link to="/dashboard/saved">Saved Posts</Link>
                </S.Box>
                <S.Box mb="1rem" fontSize="20">
                  <Link to="!#">Posts</Link>
                </S.Box>
                <S.Box mb="1rem" fontSize="20">
                  <Link to="!#">Stats</Link>
                </S.Box>
                <S.Box mb="1rem" fontSize="20">
                  <Link to="!#">Plans</Link>
                </S.Box>
                <S.Box mb="1rem" fontSize="20">
                  <Link to="!#">Help</Link>
                </S.Box>
                <S.Box mb="1rem" fontSize="20">
                  <Link to="/">Logout</Link>
                </S.Box>
              </S.Flex>
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
