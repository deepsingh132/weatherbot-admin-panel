import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  HomeIcon,
  UserIcon,
  Menu,
  LogOutIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { LayoutDashboard } from "lucide-react";
import AuthService from "@/auth/AuthService";
import { NavLink } from "react-router-dom";
import {
  useGlobalContext,
  useMobileSidebarContext,
} from "@/context/globalContext";
import iconMap from "@/utils/getIcon";
import logoSvg from "@/assets/logo.svg";
import sidebarItems from "@/config/navItems.json";
import { useModalContext } from "@/context/globalContext";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useGlobalContext();
  const { isMobileSidebar, toggleMobileSidebar } = useMobileSidebarContext();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [width, setWidth] = useState<number>(0);

  const handleWindowSizeChange = () => {
    setWidth(window?.innerWidth);
  };

  // set initial width on page load
  useEffect(() => {
    handleWindowSizeChange();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // close the sidebar when the window is resized
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 900 && isSidebarOpen) {
        toggleSidebar();
      }
      if (window.innerWidth > 768 && isMobileSidebar) {
        toggleMobileSidebar();
      }
    });
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser() as User;
    if (user) {
      setCurrentUser(user);
    }
  }, []);


  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };


  return (
    <div>
      {
        /* Sidebar for mobile */
        width < 768 && (
          <div className="overflow-hidden pt-2">
            <Menu
              onClick={() => toggleMobileSidebar()}
              className={`p-1.5 cursor-pointer ${
                isMobileSidebar ? "" : ""
              } w-12 h-12 rounded-md block bg-gray-50 hover:bg-gray-100 dark:bg-background dark:hover:bg-[--primary-color] transition-all`}
            />

            {isMobileSidebar && (
              <div
                onClick={() => toggleMobileSidebar()}
                className="overlay absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-40"
              ></div>
            )}

            <nav
              onClick={(e) => e.stopPropagation()}
              className={`absolute min-h-screen z-50 top-0 overflow-hidden ${
                isMobileSidebar ? "w-[280px]" : "w-0"
              } bg-white dark:bg-background transition-all`}
            >
              <div className={`flex flex-col p-4`}>
                <div className="flex items-center gap-2">
                  <img
                    src={logoSvg}
                    className={`overflow-hidden transition-all ${
                      isMobileSidebar ? "w-auto" : "w-0"
                    }`}
                    alt="logo"
                  />
                  <span
                    className={`font-bold ml-2 overflow-hidden ${
                      isMobileSidebar ? "w-full" : "w-0"
                    } text-lg`}
                  >
                    WeatherBot
                  </span>

                  <button
                    onClick={() => toggleMobileSidebar()}
                    className={`p-1.5 ${
                      isMobileSidebar ? "block" : "hidden"
                    } rounded-md block bg-gray-50 hover:bg-gray-100 dark:bg-background dark:hover:bg-[--primary-color] transition-all`}
                  >
                    <ChevronFirst />
                  </button>
                </div>

                <div className="flex focus:bg-black flex-col gap-2 w-full mt-10 h-full">
                  <ul className="flex-1">{children}</ul>
                </div>
              </div>
            </nav>
          </div>
        )
      }

      <aside
        className={`h-screen transition-all z-50 md:block sticky hidden top-0`}
      >
        <nav
          // prevent closing the sidebar when clicking on the sidebar
          // onClick={(e) => e.stopPropagation()}
          className="h-full relative flex flex-col bg-background border-r shadow-md"
        >
          <div
            className={` ${
              width > 876 ? "w-auto h-auto p-4 pb-2" : "p-0 h-0 w-0"
            } flex justify-between items-center`}
          >
            <img
              src={logoSvg}
              className={`overflow-hidden ${isSidebarOpen ? "w-auto" : "w-0"}`}
              alt="logo"
            />
            <span
              className={`font-bold text-foreground ml-2 overflow-hidden ${
                isSidebarOpen ? "w-full" : "w-0 h-0"
              } text-lg`}
            >
              WeatherBot
            </span>
            {width > 876 && (
              <button
                onClick={() => toggleSidebar()}
                className="p-1.5 rounded-md hidden  md:block bg-gray-50 hover:bg-gray-100 dark:bg-background dark:hover:bg-[--primary-color] transition-all"
              >
                {isSidebarOpen ? <ChevronFirst /> : <ChevronLast />}
              </button>
            )}
          </div>

          <ul className="flex-1 px-3 pt-3">{children}</ul>

          <div className="border-t flex p-3">
            <img
              src={`https://ui-avatars.com/api/?name=${currentUser?.username}&background=2481cc&color=ffffff&bold=true`}
              alt=""
              className={`w-12 h-12 rounded-md`}
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                isSidebarOpen ? "w-auto ml-3" : "w-0 ml-0"
              }
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{currentUser?.username}</h4>
                <span className="text-xs text-gray-600">
                  {currentUser?.username}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

type SidebarItemProps = {
  icon: string;
  text: string;
  active?: boolean;
  alert?: boolean;
  link: string;
};

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  link,
}: SidebarItemProps) {
  const { isSidebarOpen, toggleSidebar } = useGlobalContext();
  const { isMobileSidebar, toggleMobileSidebar } = useMobileSidebarContext();
   const { toggleModal } = useModalContext();
  const IconComponent = iconMap[icon ? icon : "BotMessageSquare"];

  function handleModal() {
    if (isMobileSidebar) {
      toggleMobileSidebar();
    }
    if (isSidebarOpen) {
      toggleSidebar();
    }
    toggleModal();
  }

  return (
    <>

      <NavLink
        onClick={() =>
          link === "?p=appearance" && handleModal()
        }
        to={link}
      >
        <li
          className={`
        relative flex items-center py-2 px-3 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-sky-200 to-blue-100 dark:from-[--primary-color] dark:to-sky-700 text-sky-800 dark:text-white"
            : "hover:bg-sky-100 dark:hover:bg-[--primary-color] text-gray-600 dark:text-gray-400"
        }
    `}
        >
          {IconComponent && <IconComponent />} {/* Render the icon component */}
          <span
            className={`overflow-hidden ${active ? "dark:text-white" : ""} whitespace-nowrap transition-all ${
              isSidebarOpen || isMobileSidebar ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                isSidebarOpen ? "" : "top-2"
              }`}
            />
          )}
          {!isSidebarOpen && (
            <div
              className={`
          absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 dark:bg-[--primary-color] dark:text-foreground text-sm z-[4]
          invisible opacity-20 -translate-x-3 duration-200 ease-in transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
            >
              {text}
            </div>
          )}
        </li>
      </NavLink>
    </>
  );
}
