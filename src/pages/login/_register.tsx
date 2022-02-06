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
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "services/api";

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const toast = useToast();

  const [form, setForm] = useState(initialValues);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const [data, error] = await api.post("/user", form);

    if (error)
      return toast({
        status: "error",
        description: error.msg,
      });

    toast({
      status: "success",
      description: "Cadastro realizado com sucesso!",
    });
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
      <VStack px={16} spacing={8} w="100%">
        <Heading>Cadastre-se</Heading>

        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input onChange={handleChange("name")} placeholder="Nome" />
        </FormControl>

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
          Cadastrar
        </Button>
      </VStack>
    </chakra.form>
  );
};

export default RegisterForm;
