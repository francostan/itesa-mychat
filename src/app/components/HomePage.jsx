import ChatView from './ChatView';
import { Box } from '@chakra-ui/react';

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
