"use client";

import { useRouter } from "next/navigation";
import SignupForm from "../../components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (email: string, password: string) => {
    const result = signup(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div>
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
}

// SIGNUP FUNCTION
function signup(
  email: string,
  password: string,
): { success: boolean; message: string } {
  // Validate fields
  if (!email.trim() || !password.trim()) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  // Basic password validation
  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  // Get existing users
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if user already exists
  const existingUser = users.find((user: any) => user.email === email);

  if (existingUser) {
    return {
      success: false,
      message: "User already exists.",
    };
  }

  // Create new user
  const newUser = {
    email,
    password,
  };

  users.push(newUser);

  // Save users
  localStorage.setItem("users", JSON.stringify(users));

  // Auto-login after signup
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  return {
    success: true,
    message: "Signup successful.",
  };
}
