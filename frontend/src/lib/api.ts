// lib/api.ts
import { useAuthStore } from "~/store/auth.store";

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const { refreshToken } = useAuthStore.getState();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const newAccessToken = data.data.accessToken;

      useAuthStore.getState().setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      useAuthStore.getState().clearAuth();
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiFetch(url: string, options: FetchOptions = {}) {
  const { skipAuth, ...fetchOptions } = options;
  const fullUrl = url.startsWith("http")
    ? url
    : `${import.meta.env.VITE_API_URL}${url}`;

  // Add auth token if not skipped
  if (!skipAuth) {
    const { accessToken } = useAuthStore.getState();
    fetchOptions.headers = {
      ...fetchOptions.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
  }

  let response = await fetch(fullUrl, fetchOptions);
  console.log(response.status);

  // If unauthorized and not already a retry, try to refresh token
  if (response.status === 401 && !skipAuth) {
    try {
      const newAccessToken = await refreshAccessToken();

      // Retry the original request with new token
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      response = await fetch(fullUrl, fetchOptions);
    } catch (error) {
      // Refresh failed, redirect to login or handle as needed
      throw error;
    }
  }

  return response;
}
