"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  id,
  label = "Delete this item?",
}: {
  action: (formData: FormData) => void;
  id: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(label)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
