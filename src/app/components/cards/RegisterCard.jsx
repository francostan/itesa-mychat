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
  Text,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, AddIcon } from "@chakra-ui/icons";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RegisterCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if(session?.status === "authenticated"){
      router.replace("/");
    }
  }, [session, router]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must have at least 8 characters with a letter");
      return;
    }
    await fetchToRegister();
  };

  const fetchToRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      })

      if (res.status === 400) {
        enqueueSnackbar("User already exists", { variant: "error" });
      } else if (res.status === 500) {
        enqueueSnackbar("An error occurred while registering", { variant: "error" });
      } else if( res.status === 201) {
        enqueueSnackbar("User created successfully", { variant: "success" });
        router.push("/auth/login");
      }
    } catch (error) {
      setError("An error occurred while registering");
    } finally {
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

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
          <form onSubmit={handleSubmit}>
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
                    children={<AddIcon />}
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
                    children={<EmailIcon />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<LockIcon />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {error !== "" && (
                    <Text color="red.500">{error}</Text>
                  )}
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box mt={4}>
        Already have an account?{" "}
        <Link style={{ color: "blue", margin: "0 5px", cursor: "pointer" }} href="/auth/login">
          Log In
        </Link>
      </Box>
    </Flex>
  );
};

export default RegisterCard;
