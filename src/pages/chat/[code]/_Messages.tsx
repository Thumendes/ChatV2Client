import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useChat } from "context/chat";
import { MessagesContainerHeight } from "data/constants";
import useDragFiles from "hooks/useDragAndDrop";
import React from "react";
import Message from "./_Message";

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = ({}) => {
  const { messagesContainerRef, messages, sendFiles } = useChat();

  function handleSelectFiles(files: FileList) {
    console.log(files);
    sendFiles(files);
  }

  const { isDragging } = useDragFiles({ handleSelectFiles });

  const borderColor = useColorModeValue("#0003", "#fff3");

  return (
    <>
      <VStack
        px={10}
        ref={messagesContainerRef}
        overflowY="auto"
        spacing={4}
        h={MessagesContainerHeight}
      >
        {messages.map((message) => (
          <Message key={message.id} item={message} />
        ))}
      </VStack>

      <Modal onClose={() => {}} isOpen={isDragging}>
        <ModalOverlay />

        <ModalContent p={4}>
          <VStack
            spacing={6}
            rounded="lg"
            textAlign="center"
            border={`2.5px dashed ${borderColor}`}
            p={6}
          >
            <Heading size="lg">Arraste os arquivos</Heading>
            <Text>Solte para enviar</Text>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Messages;
