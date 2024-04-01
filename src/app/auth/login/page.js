"use client";
import React, { useState, useEffect } from "react";
import LoginCard from "../../components/cards/LoginCard";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
    if (session) {
      window.location.href = "/";
    }
  }, [session]);

  return (
    <Box
      bgGradient="radial(circle, white, teal.500)"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <LoginCard />
    </Box>
  );
}
