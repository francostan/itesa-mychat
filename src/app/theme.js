import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
 colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
 },
 fonts: {
    heading: "Roboto, sans-serif",
    body: "Open Sans, sans-serif",
 },
});

export default theme;