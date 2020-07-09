let lastId = 0;

export function reducer(state = [], action) {
  if (action.type === "bugAdded")
    return [
      ...state,
      {
        id: ++lastId,
        discription: action.payload.discription,
        resolved: false,
      },
    ];
  else if (action.type === "bugRemoved")
    return state.filter((bug) => bug.id !== action.payload.id);
  else return state;
}
