import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

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
      bugs.lastFetch = Date.now();
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
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

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs; // Implimented Cache
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: bugsEndpoint,
      onSuccess: bugsReceived.type,
      onLoading: bugsLoaded.type,
      onError: bugsLoadingFailed.type,
    })
  );
};

export const addBugs = (bug) =>
  apiCallBegan({
    url: bugsEndpoint,
    method: "POST",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const assignBugToUser = (bug) =>
  apiCallBegan({
    url: bugsEndpoint,
    method: "patch",
    data: bug,
    onSuccess: bugAssignedToUser.type,
  });

export const resoleBug = (id) =>
  apiCallBegan({
    url: `${bugsEndpoint}/${id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
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
