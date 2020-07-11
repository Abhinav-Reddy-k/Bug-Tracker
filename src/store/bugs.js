import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],

  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (bugs, action) => {
      const ind = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs.splice(ind, 1);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      bugs.map((bug) => (bug.id === bugId ? (bug.userId = userId) : bug));
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
} = slice.actions;

export default slice.reducer;

// Selectors

// Memorisation
export const getUnresolvedBugs = createSelector(
  (store) => store.entities.bugs, // What should be unchanged here: Bugs
  (bugs) => bugs.filter((bug) => !bug.resolved) // if bugs is unchanged get from cache
);

export const getBugsByUser = (userId) =>
  createSelector(
    (store) => store.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
