import React from "react";
import type { EventItem } from "../types";


type Props = {
  items: EventItem[];
  view: "grid" | "list";
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function EventList({ items, view, onToggle, onDelete }: Props) {
  if (!items.length) {
    return <div className="empty">No hay eventos. Agrega el primero.</div>;
  }

  const containerClass = view === "grid" ? "grid" : "list";

  return (
    <div className={containerClass}>
      {items.map((e) => (
        <article className="card" key={e.id}>
          <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <h3 style={{ textDecoration: e.completed ? "line-through" : "none" }}>
              {e.title}
            </h3>
            <span className={`badge ${e.completed ? "done" : ""}`}>
              {e.completed ? "Completado" : "Pendiente"}
            </span>
          </header>
          <div className="meta">
            <span>📅 {new Date(e.date).toLocaleDateString()}</span>
            {" · "}
            <span>👤 {e.organizer}</span>
          </div>
          <div className="actions">
            <button className="btn ok" onClick={() => onToggle(e.id)}>
              {e.completed ? "Desmarcar" : "Marcar completado"}
            </button>
            <button className="btn warn" onClick={() => onDelete(e.id)}>
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
