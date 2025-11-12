import { useEffect, useState } from "react";
import moment from "moment";
import { NavLink, useNavigate } from "react-router";
import { Bell } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { notificationService } from "~/services/notification.service";
import type { Notification } from "~/types/notification.type";
import { alertService } from "~/hooks/useAlert";

const NotificationButton = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    notificationService.index().then((val) => {
      if (val.status) {
        const data = val.data?.data as Notification[];
        setNotifications(data);
      }
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string, link: string) => {
    notificationService.readNotification(id).then((val) => {
      if (val.status) {
        setNotifications(
          notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
        navigate(link);
      } else {
        alertService.error("Error", val.message);
      }
    });
  };

  const markAllAsRead = () => {
    notificationService.readNotification().then((val) => {
      if (val.status) {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
      } else {
        alertService.error("Error", val.message);
      }
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative" size={"icon-lg"}>
          <Bell />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() =>
                    markAsRead(notification._id, `/pages/${notification.link}`)
                  }
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-gray-900">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {moment(notification.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="p-3 border-t">
          <NavLink to={"/pages/settings/notifications"}>
            <Button
              variant="ghost"
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View all notifications
            </Button>
          </NavLink>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
