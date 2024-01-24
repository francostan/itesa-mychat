// ChatView.js
import { Box, Input, Button } from '@chakra-ui/react';

const ChatView = () => {
  return (
    <Box
      backgroundColor="gray.200" // Color de fondo opaco
      height="100vh" // Altura completa de la pantalla
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Aquí irá el contenido del chat */}
      <Box
        backgroundColor="white" // Fondo del área de chat
        padding="4"
        borderRadius="md"
        boxShadow="md"
        width="300px" // Ancho del área de chat
        marginBottom="4"
      >
        {/* Aquí irán los mensajes del chat */}
        {/* Puedes mapear a través de tus mensajes y mostrarlos */}
        {/* Ejemplo: */}
        {/* <Message text="Hola, ¿cómo estás?" /> */}
        {/* <Message text="¡Todo bien, gracias!" /> */}
      </Box>

      {/* Área para escribir mensajes */}
      <Box
        display="flex"
        alignItems="center"
        width="300px" // Ancho del área de entrada de mensajes
      >
        <Input
          placeholder="Escribe tu mensaje..."
          marginRight="2"
        />
        <Button colorScheme="teal">Enviar</Button>
      </Box>
    </Box>
  );
};

export default ChatView;