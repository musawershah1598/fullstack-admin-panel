import { Outlet } from "react-router";

const GuestLayout = () => {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">
      <Outlet />
    </main>
  );
};

export default GuestLayout;
