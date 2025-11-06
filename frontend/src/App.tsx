import { NavLink } from "react-router";
import { useAuth } from "~/hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <main>
      <div className="absolute top-8 right-8">
        {isAuthenticated ? (
          <NavLink to="/pages/dashboard/overview">Dashboard</NavLink>
        ) : (
          <NavLink to={"/pages/auth/login"}>Login</NavLink>
        )}
      </div>
      <h1 className="font-light text-6xl">Welcome!</h1>
    </main>
  );
}

export default App;
