import {
  Avatar,
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Message } from "context/chat";
import { useUser } from "context/user";
import React from "react";
import Attachment from "./_Attachment";

interface MessageProps {
  item: Message;
}

const Message: React.FC<MessageProps> = ({ item }) => {
  const { user } = useUser();
  const isMe = user?.id === item.userId;

  function formatDate(value: Date) {
    const date = new Date(value);

    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${hour}:${minutes}`;
  }

  const bgMine = useColorModeValue("blue.100", "blue.600");
  const bgOther = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex w="full">
      {isMe && <Spacer />}
      <Flex
        gap={4}
        direction={isMe ? "row-reverse" : "row"}
        w={["80%", "80%", "80%", "60%"]}
      >
        <Avatar src={item.sender.avatar || undefined} />

        <Flex
          rounded="md"
          p={3}
          direction="column"
          gap={2}
          bg={isMe ? bgMine : bgOther}
        >
          <Flex
            gap={4}
            fontSize={14}
            direction={isMe ? "row" : "row-reverse"}
            justify="space-between"
          >
            <Text fontWeight="bold">{item.sender.name}</Text>
            <Text>{formatDate(item.date)}</Text>
          </Flex>

          <Text>{item.text}</Text>

          {item.attachment.length > 0 && (
            <VStack>
              {item.attachment.map((attachment) => (
                <Attachment key={attachment.id} item={attachment} />
              ))}
            </VStack>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Message;
