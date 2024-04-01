"use client";
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Box, Text, Spinner } from '@chakra-ui/react';

const ChatView = dynamic(() => import('./ChatView'), {
 ssr: false,
 loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl" />
    </Box>
 ),
});

const HomeCard = dynamic(() => import('./cards/HomeCard'), {
 ssr: false,
 loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl" />
    </Box>
 ),
});

const HomePage = () => {
 const { data: session } = useSession();

 return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgGradient="radial(circle, white, teal.700)" // Usa un gradiente para el fondo
      boxShadow="lg" // Añade una sombra para darle profundidad
      p="4" // Ajusta el espaciado interno
    >
      {session?.user?.email ? <ChatView session={session} /> : <HomeCard />}
    </Box>
 );
};

export default HomePage;