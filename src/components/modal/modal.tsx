import { useEffect } from "react";

export const Modal = ({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
  }) => {

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "visible";
    };
  }, []);

  // clear the url query params when the modal is closed
  useEffect(() => {
    if (document.location.search.includes("appearance") || document.location.search.includes("logout")) {
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  // return the children wrapped in the modal component
  return (
    <div
      className="fixed cursor-auto inset-0 !z-[9999] backdrop-blur-sm md:p-10 bg-black bg-opacity-40 flex justify-center items-center !transition-none !duration-0"
      onClick={closeModal}
    >
      <div
        data-testid="modal"
        className="modal relative overflow-auto shadow rounded-2xl border dark:border-gray-700 border-cardBorder bg-white dark:bg-background md:max-w-lg max-w-[80vw] max-h-[90vh] p-2 opacity-100 transition-none duration-0"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
};
