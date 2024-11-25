import "./App.css";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import AuthService from "./auth/AuthService";
import Register from "./pages/auth/Register";
import Layout from "./pages/Layout";

import { SidebarContextProvider } from "./context/sidebarContextProvider";

import { UserContextProvider } from "./context/userContextProvider";
import Profile from "./pages/Profile";
import toast from "react-hot-toast";
import { MobileSidebarContextProvider } from "./context/mobileSidebarContextProvider";
import { ModalContextProvider } from "./context/modalContextProvider";
import Settings from "./pages/Settings";

function App() {
  const localStorageUser = AuthService.getCurrentUser();
  const darkMode = localStorage.getItem("darkMode");

  useEffect(() => {
    if (darkMode === "true" || (darkMode !== "false" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // remove the dark mode when the user changes the system preference
  useEffect(() => {

    if(localStorage.getItem("darkMode") === "true") return;

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    darkModeMediaQuery.addEventListener("change", listener);
    return () => darkModeMediaQuery.removeEventListener("change", listener);
  }, []);




  useEffect(() => {
    async function verifyUser() {
      try {
        const isVerified = await AuthService.validateUser();
        if (!isVerified) {
          AuthService.logout();
          toast.error("Error verifying user. Please login again.");
        }
      } catch (error) {
        console.error("Error: ", error);
        AuthService.logout();
        toast.error("Error verifying user. Please login again.");
      }
    }
    if (localStorageUser) verifyUser();
  }, [localStorageUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: AuthService.getCurrentUser() ? (
        <Layout>
          <Home />
        </Layout>
      ) : (
        <Login />
      ),
    },
    {
      path: "/profile",
      element: AuthService.getCurrentUser() ? (
        <Layout>
          <Profile />
        </Layout>
      ) : (
        <Login />
      ),
    },
    {
      path: "/settings",
      element: AuthService.getCurrentUser() ? (
        <Layout>
          <Settings />
        </Layout>
      ) : (
        <Login />
      )
    },
    {
      path: "/login",
      element: AuthService.getCurrentUser() ? (
        <Navigate to="/?logout=true" />
      ) : (
        <Login />
      ),
    },
    {
      path: "/register",
      element: AuthService.getCurrentUser() ? (
        <Navigate to="/" />
      ) : (
        <Register />
      ),
    },
    {
      path: "/logout",
      element: AuthService.getCurrentUser() ? (
        <Navigate to="/?logout=true" />
      ) : (
        <Login />
      ),
    },

    {
      path: "/*",
      element: <div>404</div>,
    },
  ]);

  return (
    <>
      <ModalContextProvider>
        <UserContextProvider>
          <MobileSidebarContextProvider>
            <SidebarContextProvider>
              <RouterProvider router={router} />
            </SidebarContextProvider>
          </MobileSidebarContextProvider>
        </UserContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
