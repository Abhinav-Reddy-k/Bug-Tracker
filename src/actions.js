import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVED } from "./actionsTypes";

export const bugAdded = (discription) => ({
  type: BUG_ADDED,
  payload: {
    discription,
  },
});

export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});
