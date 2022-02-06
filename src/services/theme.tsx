import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "Inter",
    heading: "Barlow",
  },
  colors: {
    gray: {
      500: "#303036",
      600: "#242430",
      700: "#181824",
      800: "#121218",
    },
  },
});
