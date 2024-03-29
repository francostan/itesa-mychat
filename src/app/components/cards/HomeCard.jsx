"use client";
import { Box, Text, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const HomeCard = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Image
          src="/background.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          style={{ filter: "blur(10px)" }}
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      </Box>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg={bgColor}
        borderRadius="lg"
        padding="8"
        boxShadow="xl"
        maxW="md"
        w="full"
      >
        <VStack spacing="6" align="stretch">
          <Text fontSize="3xl" fontWeight="bold" color={textColor} textAlign="center">Bienvenido a myChat</Text>
          <Link href="/auth/login">
          <Button colorScheme="blue" size="lg" w="full" rounded="full">Iniciar sesión</Button>
          </Link>
          <Link href="/auth/register">
          <Button colorScheme="green" size="lg" w="full" rounded="full">Registrarse</Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomeCard;
