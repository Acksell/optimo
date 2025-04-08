
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarNav from "./SidebarNav";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
