import {
  Center,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import ChatLayout from "components/ChatLayout";
import type { NextPage } from "next";

const ChatPage: NextPage = () => {
  return (
    <ChatLayout>
      <Center h="60vh">
        <VStack>
          <Heading>Seja bem-vindo ao chat!</Heading>
          <Text>
            A intenção deste chat é ser direto ao ponto, portanto, à esquerda
            você pode, <b>Selecionar uma sala para entrar</b>, ou{" "}
            <b>Criar uma sala</b>.
          </Text>

          <Text>
            Caso você tenha um <b>código de 6 dígitos</b>, pode em{" "}
            <b>Entrar na sala</b> para se conectar a ela.
          </Text>
        </VStack>
      </Center>
    </ChatLayout>
  );
};

export default ChatPage;
