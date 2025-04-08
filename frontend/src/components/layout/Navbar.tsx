
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center h-16 px-4">
        <SidebarTrigger className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <div className="ml-auto flex items-center space-x-4">
          <div className="text-sm font-medium">Optimo Dashboard</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
