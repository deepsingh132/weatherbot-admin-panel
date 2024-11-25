import React from "react";

export const MobileSidebarContext = React.createContext({
  isMobileSidebar: false,
  toggleMobileSidebar: () => {},
});

const MobileSidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileSidebar, setIsMobileSidebar] = React.useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebar(!isMobileSidebar);
  };

  return (
    <MobileSidebarContext.Provider value={{ isMobileSidebar, toggleMobileSidebar }}>
      {children}
    </MobileSidebarContext.Provider>
  );
};

export { MobileSidebarContextProvider };
