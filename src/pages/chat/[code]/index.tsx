import ChatLayout from "components/ChatLayout";
import type { NextPage } from "next";
import ChatForm from "./_Form";
import Messages from "./_Messages";

const ChatPage: NextPage = () => {
  return (
    <ChatLayout>
      <Messages />
      <ChatForm />
    </ChatLayout>
  );
};

export default ChatPage;
