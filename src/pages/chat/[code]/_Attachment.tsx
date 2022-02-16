import React from "react";
import type { Attachment as AttachmentType } from "context/chat";
import { Image } from "@chakra-ui/react";
import { Utils } from "helpers/Utils";
import AudioPlayer from "components/Audio";

interface AttachmentProps {
  item: AttachmentType;
}

const Attachment: React.FC<AttachmentProps> = ({ item }) => {
  const url = Utils.fileUrl(item.url, "attachments");

  switch (item.type) {
    case "IMAGE":
      return <Image src={url} alt={item.url} />;

    case "VIDEO":
      return <video src={url} controls />;

    case "AUDIO":
      return <AudioPlayer url={url} />;

    case "FILE":
      return <a href={url}>{item.url}</a>;

    default:
      return null;
  }
};

export default Attachment;
