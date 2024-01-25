"use client";
import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, Box } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Box position="absolute" top="10" right="10">
      <Button colorScheme="red" onClick={handleLogout} leftIcon={<CloseIcon />}>
        Logout
      </Button>
    </Box>
  );
};

export default LogOutButton;
