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

// LOGIN FUNCTION
function login(
  email: string,
  password: string,
): { success: boolean; message: string } {
  if (!email.trim() || !password.trim()) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  // Get stored users
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find matching user
  const matchedUser = users.find(
    (user: any) => user.email === email && user.password === password,
  );

  if (!matchedUser) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Save current session
  localStorage.setItem("currentUser", JSON.stringify(matchedUser));

  return {
    success: true,
    message: "Login successful.",
  };
}

function registerUser(
  email: string,
  password: string,
): { success: boolean; message: string } {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const existingUser = users.find((user: any) => user.email === email);

  if (existingUser) {
    return {
      success: false,
      message: "User already exists.",
    };
  }

  users.push({ email, password });

  localStorage.setItem("users", JSON.stringify(users));

  return {
    success: true,
    message: "User registered successfully.",
  };
}
