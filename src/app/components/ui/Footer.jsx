import React from "react";
import { Flex, Input, Button, IconButton } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
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
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        cursor="text"
        padding="3"
      />
     <IconButton
        icon={<MdSend />}
        colorScheme="teal"
        height={"95%"}
        _hover={inputMessage.trim().length > 0 && {
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      />
    </Flex>
  );
};

export default Footer;
