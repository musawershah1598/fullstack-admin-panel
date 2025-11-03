// components/AlertContainer.tsx
import { useAlertStore } from "~/hooks/useAlert";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

const alertStyles = {
  success: "border-green-500 bg-green-50 text-green-900",
  error: "border-red-500 bg-red-50 text-red-900",
  warning: "border-yellow-500 bg-yellow-50 text-yellow-900",
  info: "border-blue-500 bg-blue-50 text-blue-900",
};

const alertIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export function AlertContainer() {
  const alerts = useAlertStore((state) => state.alerts);
  const removeAlert = useAlertStore((state) => state.removeAlert);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {alerts.map((alert) => {
        const Icon = alertIcons[alert.type];
        return (
          <Alert
            key={alert.id}
            className={`${
              alertStyles[alert.type]
            } shadow-lg animate-in slide-in-from-top-5`}
          >
            <Icon className="h-4 w-4" />
            <AlertTitle className="flex items-center justify-between">
              {alert.title}
              <button
                onClick={() => removeAlert(alert.id)}
                className="ml-2 hover:opacity-70 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </AlertTitle>
            {alert.description && (
              <AlertDescription>{alert.description}</AlertDescription>
            )}
          </Alert>
        );
      })}
    </div>
  );
}
