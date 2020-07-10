import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";
import getStore from "./store/configureStore";

const store = getStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});

store.dispatch(bugAdded({ description: "Bug1" }));
store.dispatch(bugAdded({ description: "Bug2" }));
store.dispatch(bugRemoved({ id: 1 }));
store.dispatch(bugResolved({ id: 2 }));
