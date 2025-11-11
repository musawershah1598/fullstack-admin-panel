import { useEffect, useState } from "react";
import BreadcrumbComponent from "~/components/breadcrumb";
import ClearableSelect from "~/components/clearable-select";
import DeleteDialog from "~/components/delete-dialog";
import PaginationComponent, {
  type MetaDataProps,
} from "~/components/pagination";
import TableSkeleton from "~/components/table-skeleton";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { alertService } from "~/hooks/useAlert";
import EditUserDialog from "~/pages/dashboard/settings/components/edit-user";
import { userService } from "~/services/user.service";
import { UserRole, type User, type UserQueryParams } from "~/types/user.type";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [metadata, SetMetaData] = useState<MetaDataProps>();
  const [search, setSearch] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [filters, setFilters] = useState<{
    role: string;
    search: string;
    isActive: string;
    sortBy: string;
  }>({
    role: "",
    search: "",
    isActive: "",
    sortBy: "",
  });
  useEffect(() => {
    fetchUsers({});
  }, []);
  const fetchUsers = (params: UserQueryParams) => {
    setDataLoading(true);
    userService
      .fetchUser(params)
      .then((val) => {
        if (val.status) {
          const data = val.data?.data as User[];
          const meta = val.data?.metadata as MetaDataProps;
          SetMetaData(meta);
          setUsers(data);
        } else {
          alertService.error("Error", val.message);
        }
      })
      .finally(() => setDataLoading(false));
  };

  const handlePageChange = (page: number) => {
    fetchUsers({ page });
  };

  const handleUserUpdate = (user: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((item) => (item._id === user._id ? user : item))
    );
  };

  const handleDelete = async (id: string) => {
    userService.deleteUser(id).then((val) => {
      if (val.status) {
        alertService.success("Success", val.message);
        setUsers(users.filter((item) => item._id !== id));
      } else {
        alertService.error("Error", val.message);
      }
    });
  };
  return (
    <div>
      <BreadcrumbComponent />
      <h2 className="font-bold text-xl mt-4 tracking-wide">User List</h2>

      <Card className="mt-8">
        <CardHeader className="flex justify-between">
          <Input
            placeholder="search for users"
            className="max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchUsers({
                  search,
                  searchFields: ["firstName", "lastName", "email"],
                });
              }
            }}
          />

          <div className="flex gap-2">
            <ClearableSelect
              value={filters.role}
              onValueChange={(val) => {
                setFilters({ ...filters, role: val });
                fetchUsers({ role: val });
              }}
              placeholder="Filter By Role"
              options={[
                { label: UserRole.ADMIN, value: UserRole.ADMIN },
                { label: UserRole.USER, value: UserRole.USER },
              ]}
            />
            <ClearableSelect
              placeholder="Filter By Status"
              value={filters.isActive}
              onValueChange={(val) => {
                setFilters({ ...filters, isActive: val });
                fetchUsers({ isActive: val });
              }}
              options={[
                {
                  label: "Active",
                  value: "true",
                },
                {
                  label: "Disabled",
                  value: "false",
                },
              ]}
            />

            <ClearableSelect
              placeholder="Sort By"
              value={filters.sortBy}
              onValueChange={(val) => {
                setFilters({ ...filters, sortBy: val });
                fetchUsers({ sortBy: val });
              }}
              options={[
                {
                  label: "Name",
                  value: "name",
                },
                { label: "Email", value: "email" },
              ]}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataLoading ? (
                <TableSkeleton rows={5} columns={6} />
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center pt-8 text-gray-600"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                users.map((item) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.role === "admin" ? (
                          <Badge>Admin</Badge>
                        ) : (
                          <Badge variant={"secondary"}>User</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.isActive ? (
                          <Badge className="bg-green-400">Active</Badge>
                        ) : (
                          <Badge className="bg-red-400">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        <EditUserDialog
                          user={item}
                          handleUpdate={handleUserUpdate}
                        />
                        <DeleteDialog
                          title="Delete User"
                          description="Are you sure want to delete this user?"
                          handleConfirm={async () => {
                            await handleDelete(item._id);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          <PaginationComponent
            classNames="mt-8"
            metadata={metadata}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
