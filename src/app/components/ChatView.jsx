"use client";
import { Box, Input, Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../components/ui/Divider";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import Messages from "../components/ui/Messages";
import LogOutButton from "../components/buttons/LogOutButton";

const ChatView = ({ session }) => {
  const { user } = session;
  const [messages, setMessages] = useState([
    {
      from: "computer",
      text: `Hi ${user.name}, my name is Valeria, How can I help you? `,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
  };

  return (
    <Flex
      w="100%"
      justify="center"
      align="center"
      maxHeight={["100vh", "100vh", "90vh"]}
      minHeight="90vh"
    >
      <LogOutButton/>
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default ChatView;
