"use client";

import { useEffect } from "react";

export function DevCacheGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    void (async () => {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();

        await Promise.all(registrations.map((registration) => registration.unregister()));
      }

      if ("caches" in window) {
        const cacheKeys = await caches.keys();

        await Promise.all(cacheKeys.map((cacheKey) => caches.delete(cacheKey)));
      }
    })();
  }, []);

  return null;
}
