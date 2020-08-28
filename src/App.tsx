import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import theme from "@chakra-ui/theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
  </ChakraProvider>
);
