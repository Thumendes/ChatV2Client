import { useToast } from "@chakra-ui/react";
import Router from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "services/api";
import Storage from "services/Storage";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  token: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user?: User;
  getUser: () => Promise<User>;
  signOut: () => Promise<void>;
}

const UserContext = createContext({} as UserContextType);

export const useUser = () => useContext(UserContext);

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const toast = useToast();

  async function getUser() {
    const ignorable = ["/", "/login"];

    const ignore = ignorable.includes(Router.pathname);
    const token = Storage.get("token");

    if (!token && !ignore) {
      return Router.push("/login");
    }

    const [user, error] = await api.post(`/user/token`, { token });

    if ((!user || error) && !ignore) {
      return Router.push("/login");
    }

    setUser(user);

    return user;
  }

  async function signOut() {
    const token = Storage.get("token");

    const [, error] = await api.post(`/user/signout`, { token });

    if (error) {
      toast({ status: "error", title: "Erro", description: error.msg });
      return;
    }

    Storage.remove("token");
    setUser(undefined);
    Router.push("/login");
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
