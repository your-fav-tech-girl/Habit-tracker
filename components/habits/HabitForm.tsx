import { useState } from "react";

export default function HabitForm({ onSave }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      data-testid="habit-form"
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <input
        data-testid="habit-name-input"
        className="border p-2 w-full rounded"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        data-testid="habit-description-input"
        className="border p-2 w-full rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        data-testid="habit-frequency-select"
        className="border p-2 w-full rounded"
      >
        <option value="daily">Daily</option>
        <option value="daily">Weekly</option>
        <option value="daily">Bi-weekly</option>
        <option value="daily">Annualy</option>
      </select>
      <button
        data-testid="habit-save-button"
        className="bg-black text-white w-full py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
