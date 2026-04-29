"use client";

import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";
import SignupForm from "@/components/auth/SignupForm";

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

  return <SignupForm onSubmit={handleSignup} />;
}
