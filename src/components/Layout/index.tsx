import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ContainerHeight, ContainerWidth, NavbarHeight } from "data/constants";
import { FiMoon, FiSun } from "react-icons/fi";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <HStack h={NavbarHeight}>
        <Container maxW={ContainerWidth}>
          <Flex justify="space-between">
            <Flex align="center" gap={4}>
              <Text>Chat</Text>
            </Flex>

            <IconButton
              aria-label="Toggle light/dark mode"
              onClick={toggleColorMode}
              icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
            />
          </Flex>
        </Container>
      </HStack>

      <Box h={ContainerHeight} overflowY="auto">
        <Container maxW={ContainerWidth}>{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
