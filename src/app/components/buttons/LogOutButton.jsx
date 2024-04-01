import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md"; // Importa el icono de cierre de sesión
import { signOut } from "next-auth/react";

const LogOutButton = () => {
 const handleLogout = () => {
    signOut({ callbackUrl: "/" });
 };

 return (
    <Tooltip label="Logout" placement="left">
      <IconButton
        aria-label="Logout"
        icon={<MdLogout />}
        colorScheme="red"
        onClick={handleLogout}
        position="absolute"
        top="10"
        right="10"
        size="md"
        _hover={{ bg: "red.700", color: "white" }}
        mb="3"
      />
    </Tooltip>
 );
};

export default LogOutButton;
