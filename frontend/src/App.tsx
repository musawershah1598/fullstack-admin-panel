import { NavLink } from "react-router";

function App() {
  return (
    <main>
      <div className="absolute top-8 right-8">
        <NavLink to={"/pages/auth/login"}>Login</NavLink>
      </div>
      <h1 className="font-light text-6xl">Welcome!</h1>
    </main>
  );
}

export default App;
