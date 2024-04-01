import React from 'react';
import { Flex, Heading, Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const UserNameHeader = ({ userName }) => {
 const controls = useAnimation();

 useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < userName.length; i++) {
        await controls.start({
          opacity: 1,
          transition: {
            delay: i * 0.1,
          },
        });
      }
    };
    sequence();
 }, [controls, userName]);

 return (
    <Flex
      w="100%"
      justify="center"
      align="center"
      p="3"
      bg="gray.200"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Heading as="h1" size="lg" fontWeight="bold">
        <motion.span animate={controls}>{userName}</motion.span>
      </Heading>
    </Flex>
 );
};

export default UserNameHeader;