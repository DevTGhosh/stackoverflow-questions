import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/core";

export default function Footer() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  return (
    <Flex
      direction="row"
      justify="center"
      position="fixed"
      bottom="0"
      width="100%"
      py={4}
      bg={bgColor}
    >
      <Text>Stackoverflow Questions List Created by Devjyoti Ghosh</Text>
    </Flex>
  );
}
