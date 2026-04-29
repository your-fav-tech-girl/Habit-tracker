import { render, screen, fireEvent } from "@testing-library/react";
import SignupForm from "../../components/auth/SignupForm";
import LoginForm from "../../components/auth/LoginForm";

function setupLocalStorage() {
  localStorage.clear();
}

describe("auth flow", () => {
  beforeEach(() => {
    setupLocalStorage();
  });

  it("submits the signup form and creates a session", () => {
    const mockSubmit = vi.fn();

    render(<SignupForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("auth-signup-submit"));

    expect(mockSubmit).toHaveBeenCalled();
  });

  it("shows an error for duplicate signup email", () => {
    const mockSubmit = vi.fn();

    render(<SignupForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "duplicate@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("auth-signup-submit"));

    fireEvent.click(screen.getByTestId("auth-signup-submit"));

    expect(screen.getByText(/user already exists/i)).toBeInTheDocument();
  });

  it("submits the login form and stores the active session", () => {
    const mockSubmit = vi.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("auth-login-submit"));

    expect(mockSubmit).toHaveBeenCalled();
  });

  it("shows an error for invalid login credentials", () => {
    render(<LoginForm onSubmit={() => {}} />);

    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByTestId("auth-login-submit"));

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
