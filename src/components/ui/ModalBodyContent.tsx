import React from "react";
import DOMPurify from "dompurify";
import { Parser, ProcessNodeDefinitions } from "html-to-react";
import { CodeBlock, dracula } from "react-code-blocks";
import { Box, Code, Text, Link } from "@chakra-ui/core";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type Node = {
  name?: string;
  attribs?: any;
  parent?: { name?: string };
  children?: { name?: string };
};

interface ModalBodyContentProps {
  body: string;
}
export default function ModalBodyContent(props: ModalBodyContentProps) {
  // sanitze the string Html to prevents XSS attacks.
  const bodySanitize = DOMPurify.sanitize(props.body);
  const isValidNode = () => {
    return true;
  };
  // We use html-to-react to take in the html element and process them into react components
  const processNodeDefinitions = new ProcessNodeDefinitions(React);
  // During processing of the React components we change the regular HTML elements to specific Chakra ui components for styling
  const processingInstructions = [
    {
      replaceChildren: true,
      shouldProcessNode: function (node: Node) {
        // Checks if the parent is using the <pre> then puts the code in a code block
        return (
          node?.parent && node?.parent?.name && node?.parent?.name === "pre"
        );
      },
      processNode: function (node: Node, children: Node, index: Node) {
        return (
          <Box my={4}>
            <CodeBlock
              text={children}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </Box>
        );
      },
    },
    {
      replaceChildren: true,
      shouldProcessNode: function (node: Node) {
        // Checks if <code> is present but not inside a <pre>
        return (
          node &&
          node?.name &&
          node?.name === "code" &&
          node?.parent?.name &&
          node?.parent?.name !== "pre"
        );
      },
      processNode: function (node: Node, children: Node, index: Node) {
        return <Code colorScheme="gray">{children}</Code>;
      },
    },
    {
      replaceChildren: true,
      shouldProcessNode: function (node: Node) {
        return node && node?.name && node?.name === "p";
      },
      processNode: function (node: Node, children: Node, index: Node) {
        return <Text my={4}>{children}</Text>;
      },
    },
    {
      replaceChildren: true,
      shouldProcessNode: function (node: Node) {
        return (
          node &&
          node?.name &&
          node?.name === "a" &&
          node?.children?.name !== "img"
        );
      },
      processNode: function (node: Node, children: Node, index: Node) {
        const path = node?.attribs?.["href"];
        return (
          <Link color="blue.500" href={path} isExternal>
            {children}
            <ExternalLinkIcon mx="2px" mb="7px" />
          </Link>
        );
      },
    },
    {
      // Converts all the nodes into React elements
      shouldProcessNode: function (node: Node) {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];
  // Parses the santized string html processes them according to the instructions and outputs the final React elements
  const FormattedModalBody = Parser().parseWithInstructions(
    bodySanitize,
    isValidNode,
    processingInstructions
  );
  return <>{FormattedModalBody}</>;
}
