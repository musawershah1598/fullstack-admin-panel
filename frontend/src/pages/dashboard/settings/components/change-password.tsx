import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { alertService } from "~/hooks/useAlert";
import { authService } from "~/services/auth.service";
import type { ValidationErrorObj } from "~/types/default.type";
import type { PasswordFormProps } from "~/types/user.type";

const ChangePasswordComponent = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<PasswordFormProps>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordChange = (val: PasswordFormProps) => {
    authService.changePassword(val).then((res) => {
      if (res.status == 422) {
        const err = res.data as ValidationErrorObj;
        Object.keys(err).forEach((fieldName) => {
          setError(fieldName as any, {
            type: "server",
            message: err[fieldName],
          });
        });
        return;
      }
      if (res.status) {
        alertService.success("Success", res.message);
        reset();
      } else {
        alertService.error("Error", res.message);
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h4 className="text-lg">Change Password</h4>
        </CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(handlePasswordChange)}
        >
          <Field>
            <FieldLabel>Current Password</FieldLabel>
            <Input
              placeholder="enter current password"
              type="password"
              {...register("currentPassword")}
            />
            <FieldError>{errors.currentPassword?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>New Password</FieldLabel>
            <Input
              placeholder="enter new password"
              type="password"
              {...register("newPassword")}
            />
            <FieldError>{errors.newPassword?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              placeholder="confirm new password"
              type="password"
              {...register("confirmPassword")}
            />
            <FieldError>{errors.confirmPassword?.message}</FieldError>
          </Field>

          <Button variant={"secondary"} className="mt-4">
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordComponent;
