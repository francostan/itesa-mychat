"use client";
import { Box, Input, Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../components/ui/Divider";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import Messages from "../components/ui/Messages";

const ChatView = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is Valeria" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Franui" },
    {
      from: "computer",
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
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
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header />
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
