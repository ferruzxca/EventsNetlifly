import { useState } from "react";
import type { EventItem } from "../types";

type Props = { onAdd: (e: EventItem) => void };

export default function EventForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [organizer, setOrganizer] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanOrg = organizer.trim();
    if (!cleanTitle || !date || !cleanOrg) return;

    const item: EventItem = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      date,
      organizer: cleanOrg,
      completed: false
    };
    onAdd(item);
    setTitle("");
    setDate("");
    setOrganizer("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Nombre del evento"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        placeholder="Organizador(a)"
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
