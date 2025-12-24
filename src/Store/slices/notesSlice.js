import { createSlice, nanoid } from "@reduxjs/toolkit";
import { CATEGORIES } from "../../Utils/constants"

const makeEmptyLists = () => {
  const lists = { All: [] };
  CATEGORIES.forEach((c) => (lists[c] = []));
  return lists;
};

const initialState = {
  byId: {},
  lists: makeEmptyLists(),
  filter: "All",
};

function rebuildAllList(state) {
  const all = [];
  CATEGORIES.forEach((c) => {
    all.push(...state.lists[c]);
  });
  state.lists.All = all;
}

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },

    addNote: {
      reducer(state, action) {
        const note = action.payload;
        state.byId[note.id] = note;
        state.lists[note.category].unshift(note.id);
        rebuildAllList(state);
      },
      prepare({ title, content, category }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            category,
            pinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        };
      },
    },

    updateNote(state, action) {
      const { id, title, content, category } = action.payload;
      const prev = state.byId[id];
      if (!prev) return;

      if (prev.category !== category) {
        state.lists[prev.category] = state.lists[prev.category].filter((x) => x !== id);
        state.lists[category].unshift(id);
      }

      state.byId[id] = {
        ...prev,
        title,
        content,
        category,
        updatedAt: Date.now(),
      };

      rebuildAllList(state);
    },

    deleteNote(state, action) {
      const id = action.payload;
      const note = state.byId[id];
      if (!note) return;

      delete state.byId[id];
      Object.keys(state.lists).forEach((k) => {
        state.lists[k] = state.lists[k].filter((x) => x !== id);
      });

      rebuildAllList(state);
    },

    togglePin(state, action) {
      const id = action.payload;
      if (state.byId[id]) state.byId[id].pinned = !state.byId[id].pinned;
    },

    moveNote(state, action) {
      const { source, destination } = action.payload;
      if (!destination) return;

      const srcId = source.droppableId;
      const destId = destination.droppableId;

      const srcList = state.lists[srcId];
      const destList = state.lists[destId];
      if (!srcList || !destList) return;

      const [movedId] = srcList.splice(source.index, 1);
      destList.splice(destination.index, 0, movedId);

      if (srcId !== destId && destId !== "All" && state.byId[movedId]) {
        state.byId[movedId].category = destId;
        state.byId[movedId].updatedAt = Date.now();
      }

      rebuildAllList(state);
    },
  },
});

export const {
  setFilter,
  addNote,
  updateNote,
  deleteNote,
  moveNote,
  togglePin,
} = notesSlice.actions;

export default notesSlice.reducer;
