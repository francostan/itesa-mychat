"use client"
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const BackButton = ({ handleClose }) => {

  const handleBack = () => {
    if (handleClose) handleClose();
  };

  return (
    <IconButton
      aria-label="Volver"
      icon={<ArrowBackIcon />}
      onClick={handleBack}
    />
  );
};

export default BackButton;