import { useLocation, useNavigate } from "react-router";
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
import { adminRoutes } from "~/routes";

const LeftBarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path: string) => {
    navigate("/pages/" + path);
  };
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
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

      <SidebarContent className="bg-white">
        {adminRoutes.map((item) => {
          return (
            <SidebarGroup key={item.key}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarMenu>
                {item.children.map((child) => {
                  return (
                    <SidebarMenuItem
                      key={item.key + "-" + child.key}
                      className={`rounded-xl`}
                    >
                      <SidebarMenuButton
                        className={`cursor-pointer hover:bg-gray-100 text-gray-900 ${
                          location.pathname ==
                            "/pages/" + item.path + child.path &&
                          "bg-gray-100 text-primary hover:bg-gray-100 font-bold"
                        }`}
                        onClick={() => handleNavigation(item.path + child.path)}
                      >
                        <child.icon />
                        <span>{child.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftBarComponent;
