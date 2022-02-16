import ChatLayout from "components/ChatLayout";
import type { NextPage } from "next";
import DragFiles from "./_DragFiles";
import ChatForm from "./_Form";
import Messages from "./_Messages";

const ChatPage: NextPage = () => {
  return (
    <ChatLayout>
      <Messages />
      <ChatForm />
      <DragFiles />
    </ChatLayout>
  );
};

export default ChatPage;
