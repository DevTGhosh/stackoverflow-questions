import React from "react";
import { Flex } from "@chakra-ui/core";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

interface MainLayoutProps {
  children?: React.ReactNode;
}
//Main Layout of the page containing the Header , Footer and whatever Components you want in the middle as children
export default function MainLayout(props: MainLayoutProps) {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      {props.children}
      <Footer />
    </Flex>
  );
}
