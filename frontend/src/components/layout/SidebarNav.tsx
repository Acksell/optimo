
import { BarChart3, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const SidebarNav = () => {
  const { pathname } = useLocation();

  const navigation = [
    {
      title: "Sales",
      href: "/",
      icon: BarChart3,
    },
    {
      title: "Purchase Orders",
      href: "/purchase-orders",
      icon: Package,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-5">
        <span className="font-bold text-xl text-sidebar-primary">Stock Flow</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link to={item.href} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-3 py-4">
        <div className="text-xs text-sidebar-foreground/60">
          &copy; {new Date().getFullYear()} Stock Flow Dashboard
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
