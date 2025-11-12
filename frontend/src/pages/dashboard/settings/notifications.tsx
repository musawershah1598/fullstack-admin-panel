import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import BreadcrumbComponent from "~/components/breadcrumb";
import type { MetaDataProps } from "~/components/pagination";
import PaginationComponent from "~/components/pagination";
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
import { notificationService } from "~/services/notification.service";
import type {
  Notification,
  NotificationQueryParams,
} from "~/types/notification.type";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [metadata, SetMetaData] = useState<MetaDataProps>();
  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotification({});
  }, []);

  const fetchNotification = (params: NotificationQueryParams) => {
    setDataLoading(true);
    notificationService
      .index(params)
      .then((val) => {
        console.log(val);
        if (val.status) {
          const data = val.data?.data as Notification[];
          const meta = val.data?.metadata as MetaDataProps;
          SetMetaData(meta);
          setNotifications(data);
        } else {
          alertService.error("Error", val.message);
        }
      })
      .finally(() => setDataLoading(false));
  };
  const handlePageChange = (page: number) => {
    fetchNotification({ page });
  };

  return (
    <div>
      <BreadcrumbComponent />
      <h2 className="font-bold text-xl tracking-wide mt-4">Notifications</h2>

      <Card className="mt-8">
        <CardHeader className="flex justify-between">
          <Input
            placeholder="search for notifications"
            className="max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchNotification({
                  search,
                  searchFields: ["title", "message"],
                });
              }
            }}
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Has Read?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataLoading ? (
                <TableSkeleton rows={5} columns={3} />
              ) : notifications.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center pt-8 text-gray-600"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                notifications.map((item) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>
                        <NavLink
                          to={"/pages/" + item.link}
                          className={"capitalize text-blue-500"}
                        >
                          {item.link}
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        {item.read ? (
                          <Badge>Yes</Badge>
                        ) : (
                          <Badge variant={"destructive"}>No</Badge>
                        )}
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

export default NotificationPage;
