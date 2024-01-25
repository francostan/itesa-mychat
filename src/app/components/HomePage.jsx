import { Box } from '@chakra-ui/react';
import HomeCard from './cards/HomeCard';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const ChatView = dynamic(() => import('./ChatView'));

const HomePage = () => {
 const { data: session } = useSession();

 return (
    <Box
      backgroundColor="gray.200"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {session?.user?.email ? <ChatView session={session} /> : <HomeCard />}
    </Box>
 );
};

export default HomePage;