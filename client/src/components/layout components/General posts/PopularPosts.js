import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const PopularPosts = () => {
  return (
    <Flex flexDirection='column' px='100px' mt='3rem'>
      <Heading as="h1">Popular Posts</Heading>
      <Text>No posts available</Text>
    </Flex>
  );
};

export default PopularPosts;
