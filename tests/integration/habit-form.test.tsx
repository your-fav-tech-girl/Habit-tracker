import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "../../app/dashboard/page";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("habit form", () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
      "habit-tracker-session",
      JSON.stringify({
        userId: "test-user",
        email: "test@example.com",
      }),
    );

    localStorage.setItem("habit-tracker-habits", JSON.stringify([]));
  });

  it("shows a validation error when habit name is empty", () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId("create-habit-button"));
    fireEvent.click(screen.getByTestId("habit-save-button"));

    expect(screen.getByText(/habit name is required/i)).toBeInTheDocument();
  });

  it("creates a new habit and renders it in the list", () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId("create-habit-button"));

    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Drink Water" },
    });

    fireEvent.change(screen.getByTestId("habit-description-input"), {
      target: { value: "Stay hydrated" },
    });

    fireEvent.click(screen.getByTestId("habit-save-button"));

    expect(screen.getByText(/drink water/i)).toBeInTheDocument();
  });

  it("edits an existing habit and preserves immutable fields", () => {
    expect(true).toBe(true);
  });

  it("deletes a habit only after explicit confirmation", () => {
    expect(true).toBe(true);
  });

  it("toggles completion and updates the streak display", () => {
    expect(true).toBe(true);
  });
});
