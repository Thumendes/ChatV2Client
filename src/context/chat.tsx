import { useToast } from "@chakra-ui/react";
import { Utils } from "helpers/Utils";
import { Room } from "hooks/rooms";
import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  RefObject,
  useCallback,
} from "react";
import { api } from "services/api";
import { ws } from "services/websocket";
import { User, useUser } from "./user";

interface ChatContextType {
  joinRoom: (code: string) => Promise<boolean>;
  leaveRoom: () => Promise<boolean>;
  sendMessage: (message: string) => Promise<void>;
  sendFiles: (files: FileList) => Promise<void>;
  room?: Room;
  messages: Message[];
  messagesContainerRef: RefObject<HTMLDivElement>;
}

interface WsResponse {
  success: boolean;
  msg?: string;
  data?: any;
}

export type AttachmentType = "IMAGE" | "VIDEO" | "AUDIO" | "FILE";

export type Attachment = {
  id?: string;
  url: string;
  type: AttachmentType;
};

export interface SendMessagePayload {
  text: string;
  date: Date;
  roomId: string;
  senderId: string;
  attachment?: Attachment;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  roomId: string;
  gif: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  sender: User;
  attachment: Attachment[];
}

const ChatContext = createContext({} as ChatContextType);

export const useChat = () => useContext(ChatContext);

const ChatContextProvider: React.FC = ({ children }) => {
  const { query } = useRouter();
  const { user } = useUser();
  const [room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState<Message[]>([]);
  const toast = useToast();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(async () => {
    await Utils.sleep(100);
    if (!messagesContainerRef.current) return;

    const { scrollHeight, clientHeight } = messagesContainerRef.current;

    messagesContainerRef.current.scrollTop = scrollHeight;
  }, []);

  const joinRoom = useCallback(
    async (code: string) => {
      return new Promise<boolean>((resolve) => {
        if (!user) return;

        const payload = { userId: user.id, code };

        function onResponse(res: WsResponse) {
          if (!res.success) {
            toast({ status: "error", title: "Error", description: res.msg });
            resolve(false);
          }

          toast({
            status: "success",
            title: "Boaaa!",
            description: "Room joined",
          });

          setRoom(res.data);
          resolve(true);
        }

        ws.send("joinRoom", payload, onResponse);
      });
    },
    [toast, user]
  );

  const leaveRoom = useCallback(async () => {
    return new Promise<boolean>((resolve) => {
      if (!user || !room) return;

      function onRespose(res: WsResponse) {
        if (!res.success) {
          toast({ status: "error", title: "Error", description: res.msg });
          resolve(false);
        }

        toast({
          status: "success",
          title: "Boaaa!",
          description: "Saiu da sala!",
        });

        setRoom(undefined);
        resolve(true);
      }

      ws.send("leaveRoom", room.id, onRespose);
    });
  }, [room, toast, user]);

  const sendFiles = useCallback(
    async (files: FileList) => {
      console.log(user, room);
      if (!user || !room) return;

      const formData = new FormData();

      for (const [index, file] of [...files].entries()) {
        formData.append(`field${index}`, file);
      }

      const [res, error] = await api.post("/chat/upload", formData);
      console.log(res);

      if (error) {
        toast({ status: "error", title: "Error", description: error.msg });
        return;
      }

      toast({ title: "Boaaa!", description: "Arquivos enviado!" });

      for (const file of res.data) {
        const payload: SendMessagePayload = {
          text: "",
          date: new Date(),
          roomId: room.id,
          senderId: user.id,
          attachment: { url: file.url, type: file.type },
        };

        const onResponse = async (res: Message) => {
          setMessages((prev) => [...prev, res]);
          await scrollToBottom();
        };

        ws.send("sendMessage", payload, onResponse);
      }
    },
    [room, toast, user, scrollToBottom]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!room || !user) return;

      const payload: SendMessagePayload = {
        text,
        date: new Date(),
        roomId: room.id,
        senderId: user.id,
      };

      const onResponse = async (res: Message) => {
        setMessages((prev) => [...prev, res]);
        await scrollToBottom();
      };

      ws.send("sendMessage", payload, onResponse);
    },
    [room, user]
  );

  const onNewMessage = useCallback(async (data: Message) => {
    setMessages((prev) => [...prev, data]);
    await scrollToBottom();
  }, []);

  const onUserJoined = useCallback(
    async (user: User) => {
      console.log("Usuário entrou", user);
      toast({ title: "Usuário entrou!", description: user.name });
    },
    [toast]
  );

  const onUserLeft = useCallback(
    async (user: User) => {
      toast({ title: "Usuário saiu!", description: user.name });
    },
    [toast]
  );

  const loadMessages = useCallback(async () => {
    if (!user || !room) return;

    const [res, error] = await api.get(`/chat/messages/${room.code}`);

    if (error || !res) return;

    const messagesOrdered = res.sort((a: Message, b: Message) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    setMessages(messagesOrdered);
    await scrollToBottom();
  }, [room, user, scrollToBottom]);

  useEffect(() => {
    if (!query.code || !user) return;

    joinRoom(query.code as string);

    const clearOnNewMessage = ws.on("newMessage", onNewMessage);
    const clearOnUserJoined = ws.on("userJoined", onUserJoined);
    const clearOnUserLeft = ws.on("userLeft", onUserLeft);

    return () => {
      clearOnNewMessage();
      clearOnUserJoined();
      clearOnUserLeft();
    };
  }, [query, user]);

  useEffect(() => {
    if (!user || !room) return;

    loadMessages();
  }, [room, user]);

  return (
    <ChatContext.Provider
      value={{
        sendFiles,
        messagesContainerRef,
        messages,
        joinRoom,
        leaveRoom,
        room,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
