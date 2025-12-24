import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import NoteCard from "../NoteCard/NoteCard.jsx";
import { CATEGORIES } from "../../Utils/constants.js";
import styles from "./NotesBoard.module.css";

export default function NotesBoard({
  lists,
  byId,
  filter,
  onDragEnd,
  onOpen,
  onDelete,
  onTogglePin,
}) {
  const columns = filter === "All" ? CATEGORIES : [filter];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {columns.map((cat) => (
          <div key={cat} className={styles.column}>
            <div className={styles.colHeader}>
              <div className={styles.colTitle}>{cat}</div>
              <div className={styles.count}>{(lists[cat] || []).length}</div>
            </div>

            <Droppable droppableId={cat}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.dropZone} ${snapshot.isDraggingOver ? styles.dragOver : ""}`}
                >
                  {(lists[cat] || []).map((id, index) => {
                    const note = byId[id];
                    if (!note) return null;

                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(p, s) => (
                          <div
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            className={`${styles.draggable} ${s.isDragging ? styles.dragging : ""}`}
                          >
                            <NoteCard
                              note={note}
                              onOpen={() => onOpen(note)}
                              onDelete={() => onDelete(note)}
                              onTogglePin={() => onTogglePin(note)}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  {(lists[cat] || []).length === 0 && (
                    <div className={styles.empty}>No notes</div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
