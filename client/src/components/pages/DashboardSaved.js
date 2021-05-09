import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import ActivityList from "./ActivityList";

const DashboardSaved = ({ routing }) => {
  return (
    <Flex w="800px" flexDir="column" px="0" borderX="1px solid #a6a6a680">
      <Flex p="1rem" borderBottom="1px solid #a6a6a680">
        <Text fontSize="25px" fontWeight="600">
          Saved Posts
        </Text>
      </Flex>
      <ActivityList routing={routing} />
    </Flex>
  );
};

export default DashboardSaved;
