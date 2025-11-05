import React from "react";

type Props = { view: "grid" | "list"; onChange: (v: "grid" | "list") => void };

export default function ViewToggle({ view, onChange }: Props) {
  return (
    <label className="toggle">
      <span>Vista:</span>
      <select
        value={view}
        onChange={(e) => onChange(e.target.value as "grid" | "list")}
      >
        <option value="grid">Cuadrícula</option>
        <option value="list">Lista</option>
      </select>
    </label>
  );
}
