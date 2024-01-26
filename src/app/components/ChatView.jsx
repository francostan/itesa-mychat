"use client";
import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Divider from "../components/ui/Divider";
import Footer from "../components/ui/Footer";
import Messages from "../components/ui/Messages";
import LogOutButton from "../components/buttons/LogOutButton";
import { getMessages, postMessage, sendMessageToAI } from "../utils";

const ChatView = ({ session }) => {
  const { user } = session;
  const [messages, setMessages] = useState([
    {
      from: "computer",
      text: `Hola ${user.name}!, mi nombre es Valeria, ¿en que te puedo ayudar? `,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const date = new Date();
    getMessages(user.email, date).then((data) => {
      setHistory(data?.messages || []);

      const newMessagesArray = data?.messages
        ?.flatMap((message) => [
          { from: "me", text: message.input },
          { from: "computer", text: message.response },
        ])
        .filter(Boolean);

      const uniqueNewMessages = new Set([...messages, ...newMessagesArray]);

      setMessages(Array.from(uniqueNewMessages));
    });
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    const aiResponse = await sendMessageToAI(data, history);

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [
        ...old,
        { from: "computer", text: aiResponse.response },
      ]);
    }, 1000);

    setTimeout(async () => {
      await handleSaveMessage({ input: data, response: aiResponse.response });
    }, 2000);
  };

  const handleSaveMessage = async (message) => {
    const data = await postMessage(user.email, new Date(), message);
    console.log(data);
  };

  return (
    <Flex
      w="100%"
      justify="center"
      align="center"
      maxHeight={["100vh", "100vh", "90vh"]}
      minHeight="90vh"
    >
      <LogOutButton />
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
