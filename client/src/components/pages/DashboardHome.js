import * as S from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/favicon.svg";
import Profile from "./profile/Profile";
import UserPost from "./user-post/UserPost";

const DashboardHome = ({ routing, user, profile }) => {
  return (
    <Flex justifyContent="center" w="100%">
      <Flex w="calc(50vw - 400px)" h="100vh" justifyContent="flex-end">
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
      <Flex
        borderX="1px solid #a6a6a680"
        px="0rem"
        h="100%"
        flexDir="column"
        w="800px"
        pt="1rem"
      >
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          borderBottom="1px solid #a6a6a680"
        >
          <Box>
            <Text ml="1rem" fontSize="25px" fontWeight="600" mb="1rem">
              {user.params.name === "user"
                ? "Dashboard"
                : `${user.params.name}'s Profile`}
            </Text>
          </Box>
        </Flex>
        <Profile user={user.params} />
        <UserPost routing={routing} />
      </Flex>
      <Flex w="calc(50vw - 400px)" h="100vh"></Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {})(DashboardHome);
