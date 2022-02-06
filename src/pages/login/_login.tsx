import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Router from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "services/api";
import Storage from "services/Storage";

export const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const toast = useToast();

  const [form, setForm] = useState(initialValues);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const [data, error] = await api.post("/user/login", form);

    if (error)
      return toast({
        status: "error",
        description: error.msg,
      });

    Storage.set("token", data.token);

    toast({
      status: "success",
      description: "Login realizado com sucesso!",
    });

    Router.push("/chat");
  }

  const handleChange =
    (name: keyof typeof initialValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [name]: event.target.value,
      });
    };

  return (
    <chakra.form w="100%" onSubmit={onSubmit}>
      <VStack px={16} spacing={8}>
        <Heading>Entrar no chat</Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            onChange={handleChange("email")}
            placeholder="Email"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            onChange={handleChange("password")}
            placeholder="Senha"
          />
        </FormControl>

        <Button type="submit" w="100%" colorScheme="blue">
          Entrar
        </Button>
      </VStack>
    </chakra.form>
  );
};
