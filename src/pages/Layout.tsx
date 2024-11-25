import Sidebar, { SidebarItem } from "@/components/sidebar/sidebar";
import sidebarItems from "../config/navItems.json";
import { useLocation } from "react-router-dom";
import AuthService from "@/auth/AuthService";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLogout = useLocation().search.includes("logout=true");

  if (isLogout) {
    AuthService.logout();
  }

  return (
    <div className="layout flex md:flex-row flex-col min-h-screen">
      <Sidebar>
        {sidebarItems.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.name}
              link={item.url}
              active={location.pathname === item.url}
            />
          );
        })}
      </Sidebar>
      <div className={`main-container flex-grow p-2 md:p-4`}>
        {children}
      </div>
    </div>
  );
}
