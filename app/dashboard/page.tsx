"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../../lib/auth";
import {
  getUserHabits,
  createHabit,
  getHabits,
  saveHabits,
} from "../../lib/habitStorage";
import { Session } from "../../../types/auth";
import { getHabitSlug } from "../../lib/slug";
import { calculateCurrentStreak } from "../../lib/streaks";
import { toggleHabitCompletion } from "../../lib/habits";
import { logout } from "../../lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [habits, setHabits] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const [error, setError] = useState("");

  useEffect(() => {
    const currentSession = getSession();

    if (!currentSession) {
      router.push("/login");
      return;
    }

    setSession(currentSession);
    setHabits(getUserHabits(currentSession.userId));
  }, [router]);

  if (!session) return null;

  const handleCreate = () => {
    setError("Habit name is required");
    if (!name.trim()) return;

    {
      error && <p className="text-red-500 text-sm mt-2">{error}</p>;
    }

    if (editingHabitId) {
      const updatedHabits = habits.map((habit) =>
        habit.id === editingHabitId
          ? {
              ...habit,
              name,
              description,
            }
          : habit,
      );

      setHabits(updatedHabits);

      saveHabits([
        ...getHabits().filter((h) => h.userId !== session.userId),
        ...updatedHabits,
      ]);

      setEditingHabitId(null);
    } else {
      const newHabit = createHabit(session.userId, name, description);

      setHabits((prev) => [...prev, newHabit]);
    }

    setName("");
    setDescription("");
    setShowForm(false);
  };

  const handleToggleCompletion = (habitId: string) => {
    const today = new Date().toISOString().split("T")[0];

    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? toggleHabitCompletion(habit, today) : habit,
    );

    setHabits(updatedHabits);

    saveHabits([
      ...getHabits().filter((h) => h.userId !== session.userId),
      ...updatedHabits,
    ]);
  };

  const handleDeleteHabit = (habitId: string) => {
    const confirmed = window.confirm("Delete this habit?");

    if (!confirmed) return;

    const updatedHabits = habits.filter((habit) => habit.id !== habitId);

    setHabits(updatedHabits);

    saveHabits([
      ...getHabits().filter((h) => h.userId !== session.userId),
      ...updatedHabits,
    ]);
  };

  const handleEditHabit = (habitId: string) => {
    const habitToEdit = habits.find((habit) => habit.id === habitId);

    if (!habitToEdit) return;

    setName(habitToEdit.name);
    setDescription(habitToEdit.description);

    setEditingHabitId(habitId);
    setShowForm(true);
  };

  return (
    <div>
      <div className="text-center my-6">
        <h2 className="text-2xl font-bold mb-6">Habit Tracker</h2>

        <p className="text-gray-500 text-sm mb-4">
          Your daily consistency tool,one habit at a time.
        </p>
      </div>
      <div className="md:hidden flex items-center justify-between bg-white border-b p-4">
        <h2 className="text-lg font-bold">Habit Tracker</h2>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="min-h-screen bg-gray-150 flex">
        <aside className="hidden md:flex md:w-64 md:flex-col bg-white border-r p-6">
          <nav className="space-y-3 text-gray-600">
            <p className="hover:text-black cursor-pointer">Dashboard</p>
            <p className="hover:text-black cursor-pointer">Habits</p>
            <p className="hover:text-black cursor-pointer">Settings</p>
          </nav>

          <div className="mt-10">
            <button
              data-testid="auth-logout-button"
              onClick={handleLogout}
              className="w-full bg-red-700 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </aside>

        <main
          className="flex-1 p-6 sm:p-6 md:p-10"
          data-testid="dashboard-page"
        >
          <button
            data-testid="create-habit-button"
            onClick={() => setShowForm(true)}
            className="bg-green-700 text-white px-4 py-2  rounded-lg hover:bg-green-900 transition"
          >
            + Create Habit
          </button>

          {showForm && (
            <div className="flex justify-center mt-6">
              <div
                data-testid="habit-form"
                className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-3"
              >
                <input
                  data-testid="habit-name-input"
                  className="w-full border p-2 rounded mb-2"
                  placeholder="Habit name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  data-testid="habit-description-input"
                  className="w-full border p-2 rounded mb-2"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                  <button
                    data-testid="habit-save-button"
                    className="bg-green-800 text-white px-8 py-2 rounded hover:bg-green-900"
                    onClick={handleCreate}
                  >
                    {editingHabitId ? "Update Habit" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {habits.length === 0 ? (
            <div className="mx-8" data-testid="empty-state">
              No habits yet
            </div>
          ) : (
            habits.map((habit) => {
              const slug = getHabitSlug(habit.name);

              const streak = calculateCurrentStreak(habit.completions);

              const today = new Date().toISOString().split("T")[0];

              const completedToday = habit.completions.includes(today);

              return (
                <div
                  key={habit.id}
                  data-testid={`habit-card-${slug}`}
                  className="bg-white shadow-md rounded-lg p-4 mt-4 flex flex-col gap-2"
                >
                  <h3>{habit.name}</h3>
                  <p>{habit.description}</p>

                  <p data-testid={`habit-streak-${slug}`}>Streak: {streak}</p>

                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded"
                      data-testid={`habit-complete-${slug}`}
                      onClick={() => handleToggleCompletion(habit.id)}
                    >
                      {completedToday ? "Unmark Today" : "Complete Today"}
                    </button>

                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                      data-testid={`habit-edit-${slug}`}
                      onClick={() => handleEditHabit(habit.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      data-testid={`habit-delete-${slug}`}
                      onClick={() => handleDeleteHabit(habit.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
