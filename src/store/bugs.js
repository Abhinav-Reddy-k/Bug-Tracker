import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },

  reducers: {
    bugsLoaded: (bugs, actions) => {
      bugs.loading = true;
    },

    bugsLoadingFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (bugs, action) => {
      const ind = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list.splice(ind, 1);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      bugs.list.map((bug) => (bug.id === bugId ? (bug.userId = userId) : bug));
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsLoaded,
  bugsLoadingFailed,
} = slice.actions;

export default slice.reducer;

// action Creator
const bugsEndpoint = "/bugs";

export const loadBugs = () =>
  apiCallBegan({
    url: bugsEndpoint,
    onSuccess: bugsReceived.type,
    onLoading: bugsLoaded.type,
    onError: bugsLoadingFailed.type,
  });

// Selectors

// Memorisation
export const getUnresolvedBugs = createSelector(
  (store) => store.entities.bugs, // What should be unchanged here: Bugs
  (bugs) => bugs.list.filter((bug) => !bug.resolved) // if bugs is unchanged get from cache
);

export const getBugsByUser = (userId) =>
  createSelector(
    (store) => store.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.userId === userId)
  );
