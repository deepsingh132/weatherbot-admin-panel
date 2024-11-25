import React from "react";

export const SidebarContext = React.createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});

const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};


export { SidebarContextProvider};
