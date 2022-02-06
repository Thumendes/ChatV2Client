import {
  Button,
  Center,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import type { NextPage } from "next";
import Router from "next/router";
import Storage from "services/Storage";

const Home: NextPage = () => {
  const color = useColorModeValue("gray.800", "gray.300");

  function handleEnter() {
    const token = Storage.get("token");

    const route = token ? "/chat" : "/login";

    Router.push(route);
  }

  return (
    <Layout>
      <Center h="60vh">
        <VStack spacing={8}>
          <Heading size="4xl">Chat direto ao ponto</Heading>
          <Text w="80%" textAlign="center" color={color}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis neque
            odio quasi atque esse possimus enim qui expedita natus doloribus.
          </Text>

          <Button colorScheme="blue" size="lg" onClick={handleEnter}>
            Entrar
          </Button>
        </VStack>
      </Center>
    </Layout>
  );
};

export default Home;
