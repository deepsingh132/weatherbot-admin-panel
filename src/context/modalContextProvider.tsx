import React from "react";

export const ModalContext = React.createContext({
  isModalOpen: false,
  toggleModal: () => {},
});

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider };
