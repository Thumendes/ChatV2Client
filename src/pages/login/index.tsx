import { Center, Flex, Text } from "@chakra-ui/react";
import Layout from "components/Layout";
import type { NextPage } from "next";
import LoginForm from "./_login";
import RegisterForm from "./_register";

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex>
        <LoginForm />
        <Center>
          <Text>ou</Text>
        </Center>
        <RegisterForm />
      </Flex>
    </Layout>
  );
};

export default Home;
