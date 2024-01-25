"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SnackbarProvider } from "notistack";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ChakraProvider>
  );
}
