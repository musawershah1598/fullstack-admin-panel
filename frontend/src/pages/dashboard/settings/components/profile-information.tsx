import { Select } from "@radix-ui/react-select";
import { Controller, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { alertService } from "~/hooks/useAlert";
import { useAuth } from "~/hooks/useAuth";
import { userService } from "~/services/user.service";
import type { ValidationErrorObj } from "~/types/default.type";
import { UserRole, type ProfileFormProps, type User } from "~/types/user.type";

const ProfileInformationComponent = () => {
  const { user, setUser } = useAuth();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      status: user?.isActive,
    },
  });
  const profileUpdate = (val: ProfileFormProps) => {
    userService.updateProfile(val).then((res) => {
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
        setUser(res.data as User);
      } else {
        alertService.error("Error", res.message);
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h4 className="text-lg">Profile Information</h4>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(profileUpdate)}>
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input
              placeholder="enter your first name"
              {...register("firstName")}
            />
            <FieldError>{errors.firstName?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>Last Name</FieldLabel>
          </Field>
          <Input placeholder="enter your last name" {...register("lastName")} />
          <FieldError>{errors.lastName?.message}</FieldError>

          <Field>
            <FieldLabel>Email address</FieldLabel>
            <Input
              placeholder="enter your email address"
              {...register("email")}
              disabled
            />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>User Role</FieldLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={user?.role !== "admin"}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={UserRole.USER}>Customer</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.role?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Status</FieldLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value === "true")}
                  disabled={user?.role !== "admin"}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select active status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.status?.message}</FieldError>
          </Field>

          <Button>Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileInformationComponent;
