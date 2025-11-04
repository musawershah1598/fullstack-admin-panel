import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components/ui/spinner";
import { alertService } from "~/hooks/useAlert";
import { useAuth } from "~/hooks/useAuth";
import { authService } from "~/services/auth.service";
import { useAuthStore } from "~/store/auth.store";
import type { ValidationErrorObj } from "~/types/default.type";
import type { LoginFormProps, LoginSuccessResponse } from "~/types/user.type";

const LoginPage = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormProps>();
  const navigate = useNavigate();

  const handleLogin = (val: LoginFormProps) => {
    authService.login(val).then((res) => {
      if (res.status == 422) {
        Object.entries(res.data as ValidationErrorObj).forEach(
          ([field, message]) =>
            alertService.error("Error", `${field}: ${message}`)
        );
        return;
      }

      if (res.status) {
        alertService.success("Success", res.message);
        const data = res.data as LoginSuccessResponse;
        useAuthStore
          .getState()
          .setAuth(
            data.user,
            data.tokens.accessToken,
            data.tokens.refreshToken
          );
        navigate("/pages/dashboard/overview");
      } else {
        alertService.error("Error", res.message);
      }
    });
  };

  if (isLoading) {
    return (
      <main className="main-h-screen flex justify-center items-center">
        <Spinner className="size-16 text-primary" />
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={"/pages/dashboard/overview"} replace />;
  }
  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Lock className="size-16 text-primary" />
          </div>
          <h1 className="font-extrabold text-4xl">Welcome To Admin Panel</h1>
          <p>Login to access to the dashboard</p>
        </div>

        <hr className="my-8 max-w-sm mx-auto" />

        <form className="space-y-8" onSubmit={handleSubmit(handleLogin)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="enter your email address"
              id="email"
              {...register("email")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="enter your password"
              id="password"
              type="password"
              {...register("password")}
            />
          </div>
          <Button className="w-full mb-8">Login</Button>
          <div className="flex justify-between">
            <NavLink
              to={"/pages/auth/forgot-password"}
              className={"text-center"}
            >
              Forgot Password?
            </NavLink>
            <NavLink to={"/"}>Go back?</NavLink>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
