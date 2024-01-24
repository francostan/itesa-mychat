import ChatView from './ChatView';
import { Box } from '@chakra-ui/react';
import LoginCard from './cards/LoginCard';

const HomePage = () => {
  return (
    <Box
      backgroundColor="gray.200"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ChatView />
    </Box>
  );
};

export default HomePage;
