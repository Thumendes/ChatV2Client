import React from "react";
import { useRooms } from "hooks/rooms";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiHash } from "react-icons/fi";
import Layout from "components/Layout";
import Link from "next/link";
import EnterRoomForm from "./EnterRoom";
import { api } from "services/api";
import { useChat } from "context/chat";
import { ContainerHeight, ListRoomWidth } from "data/constants";
import { useUser } from "context/user";
import NewRoom from "./NewRoom";
import UserProfile from "./UserProfile";

const ChatLayout: React.FC = ({ children }) => {
  const { rooms, error, isLoading } = useRooms();
  const { joinRoom } = useChat();
  const toast = useToast();

  async function handleEnterRoom(code: string | undefined) {
    joinRoom(code || "");
  }

  async function handleCreateRoom(name: string | undefined) {
    const [newRoom, error] = await api.post("/chat/rooms", { name });

    if (error) {
      toast({ status: "error", title: "Error", description: error.msg });
      return;
    }

    console.log(newRoom);

    toast({ status: "success", title: "Boaaa!", description: "Room created" });
    joinRoom(newRoom.code);
  }

  const userBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Layout>
      <Flex>
        <VStack
          spacing={4}
          py={4}
          px={2}
          h={ContainerHeight}
          align="start"
          w={ListRoomWidth}
        >
          <UserProfile />

          <NewRoom onSubmit={handleCreateRoom} />

          <EnterRoomForm
            label="Entrar em uma sala"
            onSubmit={handleEnterRoom}
          />

          <VStack
            p={2}
            rounded="lg"
            h="full"
            bg={userBg}
            w="full"
            overflowY="auto"
          >
            {rooms && rooms.length > 0
              ? rooms.map((room) => (
                  <Link key={room.id} href={`/chat/${room.code}`} passHref>
                    <Box
                      w="100%"
                      transition="100ms"
                      _hover={{ transform: "translate(0, -2px)" }}
                      as="button"
                    >
                      <Heading textAlign="start" fontSize={20}>
                        {room.name}
                      </Heading>
                      <Flex fontSize={14} align="center" gap={1}>
                        <FiHash />
                        <Text>{room.code}</Text>
                      </Flex>
                    </Box>
                  </Link>
                ))
              : null}
          </VStack>
        </VStack>
        <Flex w="full" direction="column" h={ContainerHeight}>
          {children}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ChatLayout;
