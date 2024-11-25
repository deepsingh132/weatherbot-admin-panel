import { useContext } from "react";
import { SidebarContext } from "./sidebarContextProvider";
import { UserContext } from "./userContextProvider";
import { MobileSidebarContext } from "./mobileSidebarContextProvider";
import { ModalContext } from "./modalContextProvider";

export const useGlobalContext = () => {
  return useContext(SidebarContext);
}

export const useUserContext = () => {
  return useContext(UserContext);
}

export const useMobileSidebarContext = () => {
  return useContext(MobileSidebarContext);
}

export const useModalContext = () => {
  return useContext(ModalContext);
}