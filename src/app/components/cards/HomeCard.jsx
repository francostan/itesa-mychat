"use client";
import { Box, Text, Button, VStack, Icon } from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons';
import Link from "next/link";

const HomeCard = () => {

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bgGradient="radial(circle, white, teal.700)">
      </Box>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bgColor={"white"}
        borderRadius="lg"
        padding="8"
        boxShadow="xl"
        maxW="md"
        w="full"
      >
        <VStack spacing="6" align="stretch" p={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Icon as={ChatIcon} w={7} h={7} m={2}/>
            <Text fontSize="3xl" fontWeight="bold" fontFamily={"sans-serif"} textAlign="center" >Bienvenido a myChat</Text>
          </Box>
          <Link href="/auth/login">
            <Button colorScheme="blue" size="lg" w="full" rounded="full">Iniciar sesión</Button>
          </Link>
          <Link href="/auth/register">
            <Button colorScheme="green" size="lg" w="full" rounded="full">Registrarse</Button>
          </Link>
        </VStack>
        <Text fontSize="sm" textAlign="center" color="gray.500">Created by Francostan</Text>
      </Box>
    </Box>
  );
};

export default HomeCard;
