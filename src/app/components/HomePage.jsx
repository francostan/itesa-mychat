import ChatView from './ChatView';
import { Box } from '@chakra-ui/react';
import HomeCard from './cards/HomeCard';

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
      <HomeCard />
    </Box>
  );
};

export default HomePage;
