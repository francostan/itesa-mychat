import React, { useState } from "react";
import { Flex, Input, Button, IconButton } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const [isSended, setIsSended] = useState(false);
  return (
    <Flex w="100%" minH={"10%"} mt={"auto"} >
      <Input
        placeholder="Chatea con Valeria <3"
        marginRight="1"
        backgroundColor="white"
        borderRadius="md"
        boxShadow="sm"
        height={"100%"}
        _focus={{
          border: "1px solid black",
          color: "black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (!inputMessage) return;
            if (isSended) return;
            e.preventDefault();
            setIsSended(true);
            handleSendMessage();
          }
        }}
        value={isSended ? "" : inputMessage}
        onChange={(e) => {
          setIsSended(false);
          setInputMessage(e.target.value)
        }}
        cursor="text"
        padding="3"
      />
     <IconButton
        icon={<MdSend />}
        colorScheme="teal"
        height={"95%"}
        _hover={{
          bg: "white",
          color: "gray.500",
          border: "1px solid gray.500",
        }}
        disabled={isSended}
        onClick={handleSendMessage}
      />
    </Flex>
  );
};

export default Footer;
