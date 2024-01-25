"use client";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  FormControl,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, AddIcon } from "@chakra-ui/icons"; // Cambiado a iconos de Chakra UI

const RegisterCard = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+54");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [email, phone]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must have at least 8 characters with a letter");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number. It must have 10 digits");
      return;
    }

    setLoading(true);
    await fetchToRegister();
    setError("");
  };

  const fetchToRegister = async () => {
    try {
      // Agrega tu lógica de registro aquí

      // Ejemplo: Simulando un tiempo de espera
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Ejemplo de mensaje de registro exitoso
      console.log("User registered successfully");

      // Limpiar los campos después de un registro exitoso
      setEmail("");
      setPhone("");
      setPassword("");
      setName("");
    } catch (error) {
      setError("An error occurred while registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100wh"
      h="100vh"
      bg="gray.200"
    >
      <Stack spacing={4} align="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Create an Account</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleRegister}>
            <Stack
              spacing={4}
              p="1rem"
              bg="whiteAlpha.900"
              boxShadow="md"
              rounded="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<AddIcon />} // Cambiado a icono de Chakra UI
                  />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={error !== "" && !name}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<EmailIcon />} // Cambiado a icono de Chakra UI
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={error !== "" && !email}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<LockIcon />} // Cambiado a icono de Chakra UI
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={error !== "" && !password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {}} // Agrega tu lógica para mostrar/ocultar la contraseña
                    >
                      Show
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={loading}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link color="teal.500" href="#">
          Log In
        </Link>
      </Box>
    </Flex>
  );
};

export default RegisterCard;
