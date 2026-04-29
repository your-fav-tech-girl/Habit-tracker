import { toggleHabitCompletion } from "../../lib/habits";

const baseHabit = {
  id: "1",
  userId: "user1",
  name: "Drink Water",
  description: "",
  frequency: "daily" as const,
  createdAt: "2024-01-01",
  completions: [],
};

describe("toggleHabitCompletion", () => {
  it("adds a completion date when the date is not present", () => {
    const result = toggleHabitCompletion(baseHabit, "2024-01-10");

    expect(result.completions).toContain("2024-01-10");
  });

  it("removes a completion date when the date already exists", () => {
    const habit = {
      ...baseHabit,
      completions: ["2024-01-10"],
    };

    const result = toggleHabitCompletion(habit, "2024-01-10");

    expect(result.completions).not.toContain("2024-01-10");
  });

  it("does not mutate the original habit object", () => {
    const habit = {
      ...baseHabit,
      completions: ["2024-01-10"],
    };

    const copy = JSON.parse(JSON.stringify(habit));

    toggleHabitCompletion(habit, "2024-01-11");

    expect(habit).toEqual(copy);
  });

  it("does not return duplicate completion dates", () => {
    const habit = {
      ...baseHabit,
      completions: ["2024-01-10"],
    };

    const result = toggleHabitCompletion(habit, "2024-01-10");

    const duplicates = result.completions.filter(
      (d, i, arr) => arr.indexOf(d) !== i,
    );

    expect(duplicates.length).toBe(0);
  });
});
