import { useState } from "react";

export default function SignupForm({ onSubmit }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Habit Tracker</h1>
          <p className="text-gray-500 mt-2">
            Create your account and start building better habits
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(email, password);
          }}
        >
          <label className="text-sm font-medium text-gray-700">Email</label>

          <input
            data-testid="auth-signup-email"
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm font-medium text-gray-700">Password</label>

          <input
            data-testid="auth-signup-password"
            type="password"
            placeholder="Create a password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            data-testid="auth-signup-submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <a
            href="/login"
            className="text-green-700 font-medium ml-1 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
