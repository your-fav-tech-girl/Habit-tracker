export function calculateCurrentStreak(
  completions: string[],
  today?: string,
): number {
  if (!today) return 0;

  const unique = Array.from(new Set(completions)).sort();

  if (!unique.includes(today)) return 0;

  let streak = 1;
  let currentDate = new Date(today);

  while (true) {
    currentDate.setDate(currentDate.getDate() - 1);
    const prev = currentDate.toISOString().split("T")[0];

    if (unique.includes(prev)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
