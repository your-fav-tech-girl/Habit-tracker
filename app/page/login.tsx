"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = (email: string, password: string) => {
    const res = login(email, password);

    if (!res.success) {
      alert(res.message);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
function login(email: string, password: string): { success: boolean; message: string } {
  if (!email.trim() || !password.trim()) {
    return { success: false, message: "Email and password are required." };
  }

  const validCredentials = {
    email: "user@example.com",
    password: "password123",
  };

  if (email === validCredentials.email && password === validCredentials.password) {
    return { success: true, message: "Login successful." };
  }

  return { success: false, message: "Invalid email or password." };
}

