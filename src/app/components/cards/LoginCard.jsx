"use client";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if(session?.status === "authenticated"){
      router.replace("/");
    }
  }, [session, router]);

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    setError("");
    setIsValidating(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if(res?.error){
        enqueueSnackbar(res.error, { variant: "error" });
        console.log(res.error);
        setIsValidating(false);
      } else if(res?.url) {
        enqueueSnackbar("Login successful", { variant: "success" });
        router.replace("/");
      } else {
        enqueueSnackbar("An error occurred while logging in", { variant: "error" });
        console.log(res);
        setIsValidating(false);
      }

    } catch (error) {
      console.log(error);
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
    >
      <Stack spacing={4} align="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p="1rem"
              bg="whiteAlpha.900"
              boxShadow="md"
              rounded="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={error !== "" && !validateEmail(email)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
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
                <FormHelperText textAlign="right">
                  <Link href="#" color="teal.500">
                    Forgot password?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={isValidating}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box mt={4}>
        New to us?{" "}
        <Link
          style={{ color: "blue", margin: "0 5px", cursor: "pointer" }}
          href="/auth/register"
        >
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default LoginCard;
