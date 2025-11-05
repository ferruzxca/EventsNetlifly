import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import type { EventItem } from "./types";   // <- aquí
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import ViewToggle from "./components/ViewToggle";

const STORAGE_KEY = "gestor-eventos:v1";

export default function App() {
  const [events, setEvents] = useState<EventItem[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed: EventItem[] = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q)
    );
  }, [events, query]);

  function addEvent(item: EventItem) {
    setEvents((prev) => [item, ...prev]);
  }
  function toggleEvent(id: string) {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  }
  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }
  function clearAll() {
    if (confirm("¿Eliminar todos los eventos?")) setEvents([]);
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand">Gestor de eventos · React</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Buscar por nombre u organizador"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #2a2c42",
              background: "#101226",
              color: "var(--text)",
              width: 260
            }}
          />
          <ViewToggle view={view} onChange={setView} />
          <button className="btn warn" onClick={clearAll}>Vaciar</button>
        </div>
      </header>

      <section className="panel">
        <EventForm onAdd={addEvent} />
        <EventList
          items={filtered}
          view={view}
          onToggle={toggleEvent}
          onDelete={deleteEvent}
        />
      </section>
    </div>
  );
}
