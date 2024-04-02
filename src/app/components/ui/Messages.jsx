import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="88%" overflowY="scroll" sx={{
      "&::-webkit-scrollbar": {
        width: "6px", // Ancho de la barra de desplazamiento
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "gray.500", // Color de la barra de desplazamiento
        borderRadius: "10px", // Redondeo de las esquinas de la barra de desplazamiento
      },
    }} flexDirection="column" p="3">
      {messages.map((item, index) => {
        const commonMessageStyles = {
          maxW: "350px",
          my: "1",
          p: "4",
          borderRadius: "10px",
        };

        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="gray.500"
                color="white"
                alignSelf="flex-end"
                {...commonMessageStyles}
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%" justify="flex-start" alignItems="center">
              <Avatar
                name="Computer"
                size="sm"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
                mr="2"
              />
              <Flex
                bg="teal.500"
                color="white"
                justify="center"
                alignItems="center"
                flex="1"
                {...commonMessageStyles}
              >
                <Text w="100%" whiteSpace="pre-wrap" dangerouslySetInnerHTML={{ __html: md.renderInline(item.text) }}></Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;