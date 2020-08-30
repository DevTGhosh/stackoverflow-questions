import React from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/core";

interface BoxWithModalProps {
  question: string;
  author: string;
  date: string;
  link: string;
}

export default function BoxWithModal(props: BoxWithModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={onOpen}
        as="button"
        p={5}
        minW={750}
        shadow="md"
        borderWidth="1px"
        d="flex"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Text fontWeight={700}>{props.question}</Text>
        <Box d="flex" alignItems="flex-start" flexDirection="column">
          <Text mt={4}>Author: {props.author}</Text>
          <Text mt={1}>Created on: {props.date}</Text>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Question?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{props.question}</Text>
            </ModalBody>

            <ModalFooter>
              <Button
                as="a"
                colorScheme="blue"
                target="_blank"
                href={props.link}
              >
                Go to Stackoverflow
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
