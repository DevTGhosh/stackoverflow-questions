import React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/core";
import { HiMoon, HiSun } from "react-icons/hi";

type DarkModeButtonProps = Omit<IconButtonProps, "aria-label">;

export const DarkModeButton: React.FC<DarkModeButtonProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text: string = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(HiMoon, HiSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
