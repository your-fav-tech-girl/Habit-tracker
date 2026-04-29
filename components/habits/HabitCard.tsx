import { getHabitSlug } from "@/lib/slug";

export default function HabitCard({ habit }: any) {
  const slug = getHabitSlug(habit.name);

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className="bg-white p-4 rounded shadow"
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">{habit.name}</h3>
        <span
          data-testid={`habit-streak-${slug}`}
          className="text-sm text-gray-500"
        >
          🔥 0
        </span>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          data-testid={`habit-complete-${slug}`}
          className="text-green-600"
        >
          Done
        </button>

        <button data-testid={`habit-edit-${slug}`} className="text-blue-600">
          Edit
        </button>

        <button data-testid={`habit-delete-${slug}`} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
