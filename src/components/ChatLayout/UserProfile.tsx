import {
  Avatar,
  Box,
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
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useChat } from "context/chat";
import { useUser } from "context/user";
import { Utils } from "helpers/Utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "services/api";

interface Form {
  name: string;
  email: string;
  password?: string;
  avatar?: File;
}

const initialValues: Form = {
  name: "",
  email: "",
  password: "",
  avatar: undefined,
};

const UserProfile = () => {
  const { room } = useChat();
  const { user } = useUser();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState<Form>(initialValues);
  const [avatarPreview, setAvatarPreview] = useState("");

  const userBg = useColorModeValue("gray.100", "gray.600");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    if (form.avatar) {
      const payload = new FormData();

      payload.append("avatar", form.avatar || "");

      const [res, error] = await api.post(`/user/${user.id}/avatar`, payload);

      if (error) {
        toast({ status: "error", title: "Error", description: error.msg });
        return;
      }

      toast({
        status: "success",
        title: "Boaaa",
        description: "Avatar atualizado com sucesso!",
      });
    }

    const hasChanged = ["name", "email"].some(
      (field) => form[field as keyof Form] !== user[field as keyof Form]
    );

    if (!hasChanged || !!form.password) return;

    const [res, error] = await api.put(`/user/${user.id}`, form);

    if (error) {
      toast({ status: "error", title: "Error", description: error.msg });
      return;
    }

    toast({
      status: "success",
      title: "Boaaa",
      description: "Dados atualizados com sucesso!",
    });
    onClose();
  }

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setForm({ ...form, avatar: undefined });
      return;
    }

    const [file] = event.target.files;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    setForm({ ...form, avatar: file });
  };

  const onChange =
    (name: keyof Form) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [name]: event.target.value });
    };

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
  }, [user]);

  return (
    <>
      <Flex
        onClick={onOpen}
        cursor="pointer"
        align="center"
        w="full"
        rounded="lg"
        p={2}
        bg={userBg}
        gap={4}
      >
        <Avatar src={Utils.fileUrl(user?.avatar || "", "avatar") || ""} />
        <Box>
          <Text>{user?.name}</Text>
          <Text fontWeight="bold">{room?.name}</Text>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar dados</ModalHeader>
          <ModalCloseButton />

          <chakra.form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <VStack>
                <Avatar size="xl" src={avatarPreview || user?.avatar || ""} />

                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input value={form.name} onChange={onChange("name")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input value={form.email} onChange={onChange("email")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    value={form.password}
                    onChange={onChange("password")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Avatar</FormLabel>
                  <Input type="file" onChange={onSelectFile} />
                </FormControl>
              </VStack>
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

export default UserProfile;
