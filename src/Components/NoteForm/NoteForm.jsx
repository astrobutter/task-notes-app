import React, { useEffect, useState } from "react";
import styles from "./NoteForm.module.css";
import { CATEGORIES } from "../../Utils/constants";
import { validateNote } from "../../Utils/validators";

export default function NoteForm({ initial, onSubmit, onCancel, submitLabel = "Save" }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [category, setCategory] = useState(initial?.category || "Work");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initial?.title || "");
    setContent(initial?.content || "");
    setCategory(initial?.category || "Work");
    setErrors({});
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { title, content, category };
    const nextErrors = validateNote(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit?.(payload);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.label}>Title</div>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Meeting notes"
        />
        {errors.title && <div className={styles.error}>{errors.title}</div>}
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Content</div>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
        />
        {errors.content && <div className={styles.error}>{errors.content}</div>}
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Category</div>
        <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <div className={styles.error}>{errors.category}</div>}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={`${styles.btn} ${styles.primary}`}>{submitLabel}</button>
        <button type="button" className={styles.btn} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
