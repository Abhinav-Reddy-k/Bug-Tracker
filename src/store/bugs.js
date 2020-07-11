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
        discription: action.payload.discription,
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
  },
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

// Selectors

// Memorisation
export const getUnresolvedBugs = createSelector(
  (store) => store.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);
