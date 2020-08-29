import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import theme from "@chakra-ui/theme";
import MainLayout from "./components/layout/MainLayout";
import QuestionList from "./components/sections/QuestionList";

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <MainLayout>
      <QuestionList />
    </MainLayout>
  </ChakraProvider>
);
