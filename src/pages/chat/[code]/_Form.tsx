import {
  Box,
  ButtonGroup,
  chakra,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useChat } from "context/chat";
import { ChatFormHeight } from "data/constants";
import React, { FormEvent, useCallback, useRef } from "react";
import { FiSend } from "react-icons/fi";

interface ChatFormProps {}

const ChatForm: React.FC<ChatFormProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, room } = useChat();

  const handleSendMessage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const text = inputRef.current?.value;
      if (!text) return;

      await sendMessage(text);
      inputRef.current.value = "";
    },
    [sendMessage]
  );

  return (
    <Flex align="center" h={ChatFormHeight}>
      <chakra.form w="full" onSubmit={handleSendMessage}>
        <HStack>
          <Input ref={inputRef} placeholder="Digite mensagem..." />

          <IconButton
            rounded="full"
            type="submit"
            aria-label=""
            icon={<FiSend />}
          />
        </HStack>
      </chakra.form>
    </Flex>
  );
};

export default ChatForm;
