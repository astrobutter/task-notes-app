import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Store/slices/authSlice.js";
import {
  addNote,
  updateNote,
  deleteNote,
  setFilter,
  moveNote,
  togglePin,
} from "../../Store/slices/notesSlice.js";
import { toggleTheme } from "../../Store/slices/themeSlice.js";
import NotesBoard from "../../Components/NotesBoard/NotesBoard.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import NoteForm from "../../Components/NoteForm/NoteForm.jsx";
import { CATEGORIES } from "../../Utils/constants.js";
import logo from "../../Assets/logo.png";
import styles from "./Dashboard.module.css";
import ToggleTheme from "../../Components/ToggleTheme/ToggleTheme.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { byId, lists, filter } = useSelector((s) => s.notes);
  const theme = useSelector((s) => s.theme.theme);

  const [createOpen, setCreateOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [deleteNoteObj, setDeleteNoteObj] = useState(null);

  const visibleLists = useMemo(() => {
    const out = { ...lists };
    CATEGORIES.forEach((cat) => {
      const ids = lists[cat] || [];
      const pinned = [];
      const rest = [];
      ids.forEach((id) => (byId[id]?.pinned ? pinned.push(id) : rest.push(id)));
      out[cat] = [...pinned, ...rest];
    });
    return out;
  }, [lists, byId]);

  function handleLogout() {
    dispatch(logoutUser());
  }

  function handleCreate(payload) {
    dispatch(addNote(payload));
    setCreateOpen(false);
  }

  function handleEditSave(payload) {
    dispatch(updateNote({ id: editNote.id, ...payload }));
    setEditNote(null);
  }

  function handleDeleteConfirm() {
    dispatch(deleteNote(deleteNoteObj.id));
    setDeleteNoteObj(null);
  }

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    dispatch(moveNote({ source, destination }));
  }

  const totalCount = CATEGORIES.reduce((sum, c) => sum + (lists[c]?.length || 0), 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div>
            <div className={styles.title}>Keep Notes</div>
          </div>
        </div>

        <div className={styles.headerActions}>
          <select
            className={styles.select}
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          >
            <option value="All">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button className={`${styles.btn} ${styles.primary}`} onClick={() => setCreateOpen(true)}>
            + New Note
          </button>

          <button className={`${styles.btn} ${styles.danger}`} onClick={handleLogout}>
            ⏻
          </button>
        </div>
      </div>

      <NotesBoard
        lists={visibleLists}
        byId={byId}
        filter={filter}
        onDragEnd={onDragEnd}
        onOpen={(note) => setEditNote(note)}
        onDelete={(note) => setDeleteNoteObj(note)}
        onTogglePin={(note) => dispatch(togglePin(note.id))}
      />

      {createOpen && (
        <Modal title="Create Note" onClose={() => setCreateOpen(false)}>
          <NoteForm
            initial={null}
            submitLabel="Create"
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
          />
        </Modal>
      )}

      {editNote && (
        <Modal title="View & Edit Note" onClose={() => setEditNote(null)}>
          <NoteForm
            initial={editNote}
            submitLabel="Update"
            onSubmit={handleEditSave}
            onCancel={() => setEditNote(null)}
          />
        </Modal>
      )}

      {deleteNoteObj && (
        <Modal title="Confirm Delete" onClose={() => setDeleteNoteObj(null)} width={460}>
          <div className={styles.confirmText}>
            Are you sure you want to delete <b>{deleteNoteObj.title}</b>?
          </div>
          <div className={styles.confirmActions}>
            <button className={`${styles.btn} ${styles.danger}`} onClick={handleDeleteConfirm}>
              Yes, Delete
            </button>
            <button className={styles.btn} onClick={() => setDeleteNoteObj(null)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
