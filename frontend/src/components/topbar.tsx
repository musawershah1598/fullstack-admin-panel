import { Bell, LogOut, Mail, Search } from "lucide-react";
import { CommandMenu } from "~/components/page-search-dialog";
import ThemeToggle from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
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

        <CommandMenu />
        <Button
          variant="outline"
          className="relative w-64 justify-start text-sm text-muted-foreground"
          onClick={() =>
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true })
            )
          }
        >
          <Search className="mr-2 h-4 w-4" />
          Search pages...
          <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
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
