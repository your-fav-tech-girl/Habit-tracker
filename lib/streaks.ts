export function getTodayDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function calculateCurrentStreak(
  completions: string[],
  today?: string,
): number {
  if (!today || completions.length === 0) return 0;

  const unique = Array.from(new Set(completions)).sort();

  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const current = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    if (unique.includes(current)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
