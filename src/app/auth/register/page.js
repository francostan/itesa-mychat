import React from "react";
import { Box } from "@chakra-ui/react";
import RegisterCard from "../../components/cards/RegisterCard";

export default function Login() {
  return (
    <Box
      bgGradient="radial(circle, white, teal.500)"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <RegisterCard />
    </Box>
  );
}
