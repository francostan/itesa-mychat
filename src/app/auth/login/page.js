import React from 'react'
import LoginCard from '../../components/cards/LoginCard';
import { Box } from '@chakra-ui/react';

export default function Login() {

    return (
        <Box
            backgroundColor="gray.200"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <LoginCard />
        </Box>

    );
};