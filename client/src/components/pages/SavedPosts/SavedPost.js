import { Flex } from "@chakra-ui/layout";
import * as S from "@chakra-ui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearPost } from "../../../actions/getPostAction";
import { removeNav } from "../../../actions/navAction";
import Logo from "../../../assets/favicon.svg";
import DashboardSaved from "../DashboardSaved";

const SavedPost = ({ removeNav, history, clearPost, profile }) => {
  useEffect(() => {
    removeNav();
    clearPost();

    // eslint-disable-next-line
  }, []);

  return (
    <Flex h="100%">
      <Flex w="calc(50vw - 400px)" justifyContent="flex-end">
        <Flex flexDir="column" w="15rem" pt="1rem">
          <S.Flex justifyContent="flex-start" alignItems="center">
            <Link to="/">
              <div>
                <S.Image src={Logo} alt="devhelp" />
              </div>
            </Link>
            <S.Text ml="1rem">Devhelp</S.Text>
          </S.Flex>
          <S.Flex flexDirection="column" pt="5">
            <S.Box mb="1rem" fontSize="20">
              <Link to={`/dashboard/home/user/${profile.profile._id}`}>
                Home
              </Link>
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
        </Flex>
      </Flex>
      <DashboardSaved routing={history} />
      <Flex w="calc(50vw - 400px)"></Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { removeNav, clearPost })(SavedPost);
