import { createContext, useState } from "react";

type AuthUser = {
  name: string;
  email: string;
};
type User = {
  id: string;
  name: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
