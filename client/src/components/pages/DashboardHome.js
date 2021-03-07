import React from "react";
import UserPost from "./user-post/UserPost";
import Profile from "./profile/Profile";
import { Flex, Box, Text } from "@chakra-ui/react";
import DashboardSideBar from "./DashboardSideBar";

const DashboardHome = ({ routing, user }) => {
  return (
    <Flex flexDir="column" pt="2rem" px="6rem" w="100vw">
      <Flex justifyContent="flex-start" alignItems="center">
        {user.params.name === "user" && (
          <Box>
            <DashboardSideBar />
          </Box>
        )}
        <Box>
          <Text fontSize="25px" fontWeight="600">
            {user.params.name === "user"
              ? "Dashboard"
              : `${user.params.name}'s Profile`}
          </Text>
        </Box>
      </Flex>
      <Profile user={user.params} />
      <UserPost routing={routing} />
    </Flex>
  );
};

export default DashboardHome;
