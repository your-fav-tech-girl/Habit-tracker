import { Habit } from "../../types/habit";
import { STORAGE_KEYS, getStorage, setStorage } from "./storage";

/**
 * Get all habits from storage
 */
export function getHabits(): Habit[] {
  return getStorage<Habit[]>(STORAGE_KEYS.habits, []);
}

/**
 * Save all habits
 */
export function saveHabits(habits: Habit[]) {
  setStorage(STORAGE_KEYS.habits, habits);
}

/**
 * Get habits for a specific user
 */
export function getUserHabits(userId: string): Habit[] {
  return getHabits().filter((h) => h.userId === userId);
}

/**
 * Create a habit
 */
export function createHabit(
  userId: string,
  name: string,
  description: string = "",
): Habit {
  const habits = getHabits();

  const newHabit: Habit = {
    id: crypto.randomUUID(),
    userId,
    name,
    description,
    frequency: "daily",
    createdAt: new Date().toISOString(),
    completions: [],
  };

  const updated = [...habits, newHabit];

  saveHabits(updated);

  return newHabit;
}
