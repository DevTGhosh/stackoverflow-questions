import React from "react";
import { Flex, Text } from "@chakra-ui/core";

export default function Footer() {
  return (
    <Flex
      direction="row"
      justify="center"
      position="fixed"
      bottom="0"
      width="100%"
      py={4}
    >
      <Text>Stackoverflow Questions List Created by Devjyoti Ghosh</Text>
    </Flex>
  );
}
