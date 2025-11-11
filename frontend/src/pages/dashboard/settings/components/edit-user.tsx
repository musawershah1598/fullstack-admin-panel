import { Edit } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { alertService } from "~/hooks/useAlert";
import { authService } from "~/services/auth.service";
import type { ValidationErrorObj } from "~/types/default.type";
import { UserRole, type ProfileFormProps, type User } from "~/types/user.type";

type EditUserDialogProps = {
  user: User;
  handleUpdate: (user: User) => void;
};

const EditUserDialog = ({ user, handleUpdate }: EditUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.isActive,
    },
  });

  const onSubmit = (val: ProfileFormProps) => {
    authService.updateProfile(val).then((res) => {
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
        handleUpdate(res.data as User);
        setOpen(false);
      } else {
        alertService.error("Error", res.message);
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input
              placeholder="enter your first name"
              {...register("firstName")}
            />
          </Field>
          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input
              placeholder="enter your last name"
              {...register("lastName")}
            />
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              placeholder="enter your email address"
              {...register("email")}
            />
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

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
