"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = getSession();

      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }, 1000); // test-safe duration

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      data-testid="splash-screen"
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-gray-100"
    >
      <h1 className="text-4xl font-bold text-green-700">Habit Tracker</h1>
    </div>
  );
}
