"use client";

import SignupForm from "../../components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-4">Create account</h1>
        <SignupForm onSubmit={() => {}} />
      </div>
    </div>
  );
}
