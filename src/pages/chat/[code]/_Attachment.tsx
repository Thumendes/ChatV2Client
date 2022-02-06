import React from "react";
import type { Attachment as AttachmentType } from "context/chat";
import { Image } from "@chakra-ui/react";

interface AttachmentProps {
  item: AttachmentType;
}

const Attachment: React.FC<AttachmentProps> = ({ item }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/attachments/${item.url}`;

  switch (item.type) {
    case "IMAGE":
      return <Image src={url} alt={item.url} />;

    case "VIDEO":
      return <video src={url} controls />;

    case "AUDIO":
      return <audio src={url} controls />;

    case "FILE":
      return <a href={url}>{item.url}</a>;

    default:
      return null;
  }
};

export default Attachment;
