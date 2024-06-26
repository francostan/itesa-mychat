"use client";
import React, { useEffect, useState } from "react";
import { Flex, Spinner, Box } from "@chakra-ui/react";
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
      text: `Hola ${user.name}! mi nombre es Valeria y utilizo Gemini AI, ¿en que te puedo ayudar?`,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setLoading(true);
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

    setLoading(false);
  }, []);

  const handleSendMessage = async () => {
    setIsAnswered(true);
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
        { from: "computer", text: aiResponse?.response || "" },
      ]);
    }, 100);

    setTimeout(async () => {
      await handleSaveMessage({ input: data, response: aiResponse.response });
    }, 200);
    setIsAnswered(false);
  };

  const handleSaveMessage = async (message) => {
    const data = await postMessage(user.email, new Date(), message);
  };

  return (
      <Flex
        w={{ base: "95%", md: "50%" }}
        justify="center"
        align="center"
        height="100%"
        maxHeight={{ base: "70vh", md: ["100vh", "100vh", "90vh"] }}
        minHeight={{ base: "70vh", md: ["100vh", "100vh", "90vh"] }}
        backgroundColor={"gray.100"}
        borderRadius={"lg"}
        boxShadow="lg"
        p="3"
      >
        <LogOutButton />
        <Flex w={"100%"} h="100%" flexDir="column">
          {loading ? <Spinner size="xl" /> : <Messages messages={messages} />}
          <Footer
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isAnswered={isAnswered}
          />
        </Flex>
      </Flex>
  );
};

export default ChatView;
