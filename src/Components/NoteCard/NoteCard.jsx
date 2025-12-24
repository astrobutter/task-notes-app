import React from "react";
import styles from "./NoteCard.module.css";
import { CATEGORY_COLORS } from "../../Utils/constants";

export default function NoteCard({ note, onOpen, onDelete, onTogglePin }) {
  const color = CATEGORY_COLORS[note.category] || "var(--accent)";

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.titleRow}>
          <div className={styles.title} title={note.title}>{note.title}</div>
          {note.pinned && <div className={styles.pin} title="Pinned">📌</div>}
        </div>

        <div className={styles.meta}>
          <span className={styles.badge} style={{ background: color }}>
            {note.category}
          </span>
        </div>
      </div>

      <div className={styles.content}>{note.content}</div>

      <div className={styles.actions}>
        <button className={styles.btn} onClick={onOpen}>View / Edit</button>
        <button className={styles.btn} onClick={onTogglePin}>{note.pinned ? "📌" : "📍"}</button>
        <button className={`${styles.btn} ${styles.danger}`} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
