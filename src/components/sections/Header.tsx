import React from "react";
import { Box, Flex, Text, Image, useColorMode } from "@chakra-ui/core";

import { DarkModeButton } from "../ui/DarkModeButton";

interface MenuItemsProps {
  isLast: boolean;
  children: React.ReactNode;
}
const MenuItems = (props: MenuItemsProps) => {
  const { children, isLast } = props;
  const { colorMode } = useColorMode();
  const color = { light: "gray.900", dark: "gray.50" };
  const hoverColor = { light: "teal.600", dark: "teal.500" };
  let activeStyle = {};
  return (
    <Box
      color={color[colorMode]}
      _hover={{ color: hoverColor[colorMode] }}
      _active={activeStyle}
    >
      <Text
        mb={{ base: isLast ? 0 : 8, sm: 0 }}
        mr={{ base: 0, sm: isLast ? 0 : 8 }}
        display="block"
        color="currentColor"
      >
        {children}
      </Text>
    </Box>
  );
};

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
    >
      <Flex align="center">
        <Image
          src="https://cdn.sstatic.net/Sites/stackoverflow/company/Img/logos/so/so-icon.png?v=c78bd457575a"
          alt="Logo icon"
          boxSize="50px"
          fallbackSrc="https://via.placeholder.com/100"
        />
      </Flex>

      <Flex align="center" justify="center" direction="row">
        <MenuItems isLast>
          <DarkModeButton />
        </MenuItems>
      </Flex>
    </Flex>
  );
};

export default Header;
