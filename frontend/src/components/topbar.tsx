import { Bell, LogOut, Mail } from "lucide-react";
import ThemeToggle from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { alertService } from "~/hooks/useAlert";
import { useAuth } from "~/hooks/useAuth";

const TopBarComponent = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout().then(() => {
      alertService.success("Success", "Logout successfull");
    });
  };
  return (
    <header className="py-4 px-2 border-b flex items-center justify-between bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <SidebarTrigger className="size-8 cursor-pointer mr-2" />

        <Input className="max-w-xs" placeholder="Search for items" />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant={"outline"} size={"icon-lg"}>
          <Bell />
        </Button>
        <Button variant="outline" size={"icon-lg"}>
          <Mail />
        </Button>

        <Button onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default TopBarComponent;
