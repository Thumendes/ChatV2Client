import React, { useCallback } from "react";
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
import { useUser } from "context/user";
import { useChat } from "context/chat";
import useDragFiles from "hooks/useDragAndDrop";

const DragFiles = () => {
  const { user } = useUser();
  const { sendFiles, room } = useChat();

  const handleSelectFiles = useCallback(
    (files: FileList) => {
      console.log(files);
      sendFiles(files);
    },
    [sendFiles, room, user]
  );

  const { isDragging } = useDragFiles({
    handleSelectFiles,
    dependencies: [room, user],
  });

  const borderColor = useColorModeValue("#0003", "#fff3");

  return (
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
          <Text>Solte para enviar para {room?.name}</Text>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default DragFiles;
