import { create } from "zustand";

export type AlertType = "success" | "error" | "warning" | "info";

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description?: string;
  duration?: number;
}

interface AlertStore {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id">) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (alert) => {
    const id = Math.random().toString(36).substring(7);
    const newAlert = { ...alert, id };

    set((state) => ({
      alerts: [...state.alerts, newAlert],
    }));

    // Auto-remove after duration (default 5 seconds)
    const duration = alert.duration || 5000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        }));
      }, duration);
    }
  },
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
  clearAlerts: () => set({ alerts: [] }),
}));

// Hook for components
export const useAlert = () => {
  const { addAlert, removeAlert, clearAlerts } = useAlertStore();

  return {
    success: (title: string, description?: string, duration?: number) =>
      addAlert({ type: "success", title, description, duration }),
    error: (title: string, description?: string, duration?: number) =>
      addAlert({ type: "error", title, description, duration }),
    warning: (title: string, description?: string, duration?: number) =>
      addAlert({ type: "warning", title, description, duration }),
    info: (title: string, description?: string, duration?: number) =>
      addAlert({ type: "info", title, description, duration }),
    remove: removeAlert,
    clear: clearAlerts,
  };
};

// Service helper - can be used from anywhere without hooks
export const alertService = {
  success: (title: string, description?: string, duration?: number) =>
    useAlertStore
      .getState()
      .addAlert({ type: "success", title, description, duration }),
  error: (title: string, description?: string, duration?: number) =>
    useAlertStore
      .getState()
      .addAlert({ type: "error", title, description, duration }),
  warning: (title: string, description?: string, duration?: number) =>
    useAlertStore
      .getState()
      .addAlert({ type: "warning", title, description, duration }),
  info: (title: string, description?: string, duration?: number) =>
    useAlertStore
      .getState()
      .addAlert({ type: "info", title, description, duration }),
};
