import React from "react";

export const UserContext = React.createContext({
  user: {} as User,
})

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : {};

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
