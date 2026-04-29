"use client";

import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    const result = login(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.push("/dashboard");
  };

  return <LoginForm onSubmit={handleLogin} />;
}
