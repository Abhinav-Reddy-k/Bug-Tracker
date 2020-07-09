import store from "./store";

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});

store.dispatch({
  type: "bugAdded",
  payload: {
    discription: "Bug 1",
  },
});

unsubscribe();

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});
