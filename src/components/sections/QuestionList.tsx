import React from "react";
import { Stack } from "@chakra-ui/core";
import BoxWithModal from "../ui/BoxWithModal";

export default function QuestionList() {
  return (
    <Stack spacing={8}>
      <BoxWithModal
        question="Plan Money"
        date="12/10/17"
        author="Dev"
        link="https://chakra-ui.com"
      />
      <BoxWithModal
        question="Plan Money"
        date="12/10/17"
        author="Dev"
        link="https://chakra-ui.com"
      />
    </Stack>
  );
}
