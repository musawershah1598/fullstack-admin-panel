import { NavLink } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import ThemeToggle from "./components/theme-toggle";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <main>
      <div className="absolute top-8 right-8">
        <div className="flex items-center justify-center space-x-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <NavLink to="/pages/dashboard/overview">Dashboard</NavLink>
          ) : (
            <NavLink to={"/pages/auth/login"}>Login</NavLink>
          )}
        </div>
      </div>
      <h1 className="font-light text-6xl">Welcome!</h1>
    </main>
  );
}

export default App;
