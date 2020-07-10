// Action Types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";
const BUG_DIFFICULTY = "bugDifficulty";

// Actions
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

export const bugDifficulty = (id, difficulty) => ({
  type: BUG_DIFFICULTY,
  payload: {
    id,
    difficulty,
  },
});

// Reducers
let lastId = 0;

export default function reducer(state = [], action) {
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
