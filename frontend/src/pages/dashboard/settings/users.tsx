import BreadcrumbComponent from "~/components/breadcrumb";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { UserRole } from "~/types/user.type";

const UsersPage = () => {
  return (
    <div>
      <BreadcrumbComponent />
      <h2 className="font-bold text-xl mt-4 tracking-wide">User List</h2>

      <Card className="mt-8">
        <CardHeader className="flex justify-between">
          <Input placeholder="search for users" className="max-w-xs" />

          <div className="flex gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter By Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.ADMIN}>{UserRole.ADMIN}</SelectItem>
                <SelectItem value={UserRole.USER}>{UserRole.USER}</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter By Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"true"}>Active</SelectItem>
                <SelectItem value={"false"}>Disabled</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"name"}>Name</SelectItem>
                <SelectItem value={"email"}>Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
