import { useNavigate } from "react-router";
import { Separator } from "~/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { useAuth } from "~/hooks/useAuth";
import { adminRoutes, type Routes } from "~/routes";
import type { User } from "~/types/user.type";

const LeftBarComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleNavigation = (path: string) => {
    navigate("/pages/" + path);
  };
  return (
    <Sidebar>
      <SidebarHeader className="bg-white dark:bg-gray-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size={"lg"}
              asChild
              className="flex justify-center"
            >
              <a href="#" className="font-bold text-xl">
                Admin Panel
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />

      <SidebarContent className="bg-white dark:bg-gray-900">
        {adminRoutes.map((item) => renderRoute(item, user, handleNavigation))}
      </SidebarContent>
    </Sidebar>
  );
};

const renderRoute = (
  item: Routes,
  user: User | null,
  handleNavigation: (path: string) => void
) => {
  if (item.status && user) {
    if (item.type.includes(user.role)) {
      return (
        <SidebarGroup key={item.key}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarMenu>
            {item.children.map((child) => {
              if (child.status) {
                if (child.type.includes(user.role)) {
                  return (
                    <SidebarMenuItem
                      key={item.key + "-" + child.key}
                      className={`rounded-xl`}
                    >
                      <SidebarMenuButton
                        className={`cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                          location.pathname ==
                            "/pages/" + item.path + child.path &&
                          "bg-gray-100 dark:bg-gray-800 text-primary hover:bg-gray-100 font-bold"
                        }`}
                        onClick={() => handleNavigation(item.path + child.path)}
                      >
                        <child.icon />
                        <span>{child.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              }
            })}
          </SidebarMenu>
        </SidebarGroup>
      );
    }
  }
};

export default LeftBarComponent;
