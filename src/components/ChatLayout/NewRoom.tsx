import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FormEvent, useRef } from "react";

interface NewRoomProps {
  onSubmit: (data: string | undefined) => void;
}

const NewRoom: React.FC<NewRoomProps> = ({ onSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = inputRef.current?.value;
    onSubmit(value);
    onClose();
  }

  return (
    <>
      <Button w="full" onClick={onOpen}>
        Criar nova sala
      </Button>

      <Modal initialFocusRef={inputRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar nova sala</ModalHeader>
          <ModalCloseButton />

          <chakra.form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome da sala</FormLabel>
                <Input ref={inputRef} placeholder="Nome da sala" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Salvar
              </Button>
              <Button onClick={onClose}>Voltar</Button>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewRoom;
