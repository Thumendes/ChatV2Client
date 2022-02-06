import React, { FormEvent, useRef } from "react";
import {
  chakra,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

interface CollapseFormProps {
  label: string;
  onSubmit: (data: string | undefined) => void;
}

const EnterRoomForm: React.FC<CollapseFormProps> = ({ label, onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = inputRef.current?.value;
    onSubmit(value);
  }

  return (
    <chakra.form onSubmit={handleSubmit}>
      <HStack>
        <Input ref={inputRef} placeholder={label} />
        <IconButton type="submit" aria-label="" icon={<FiChevronRight />} />
      </HStack>
    </chakra.form>
  );
};

export default EnterRoomForm;
