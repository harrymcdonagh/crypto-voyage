import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
    description: "Roboto, sans-serif",
  },
});

export default theme;
