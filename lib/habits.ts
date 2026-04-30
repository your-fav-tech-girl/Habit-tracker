import { Habit } from "../types/habit";
import { getTodayDate } from "./streaks";

export function toggleHabitCompletion(
  habit: Habit,
  date: string = getTodayDate(),
): Habit {
  const completions = habit.completions.includes(date)
    ? habit.completions.filter((d) => d !== date)
    : [...habit.completions, date];

  return {
    ...habit,
    completions: Array.from(new Set(completions)),
  };
}
