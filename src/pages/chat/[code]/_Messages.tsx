import React from "react";
import { VStack } from "@chakra-ui/react";
import { useChat } from "context/chat";
import { MessagesContainerHeight } from "data/constants";
import Message from "./_Message";

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = ({}) => {
  const { messagesContainerRef, messages } = useChat();

  return (
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
  );
};

export default Messages;
