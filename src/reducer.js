import {
  BUG_ADDED,
  BUG_REMOVED,
  BUG_RESOLVED,
  BUG_DIFFICULTY,
} from "./actionsTypes";

let lastId = 0;

export function reducer(state = [], action) {
  if (action.type === BUG_ADDED)
    return [
      ...state,
      {
        id: ++lastId,
        discription: action.payload.discription,
        resolved: false,
      },
    ];
  else if (action.type === BUG_REMOVED)
    return state.filter((bug) => bug.id !== action.payload.id);
  else if (action.type === BUG_RESOLVED)
    return state.map((bug) =>
      bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
    );
  else if (action.type === BUG_DIFFICULTY)
    return state.map((bug) =>
      bug.id === action.payload.id
        ? { ...bug, difficulty: action.payload.difficulty }
        : bug
    );
  else return state;
}
