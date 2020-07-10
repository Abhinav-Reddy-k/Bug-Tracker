import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});

store.dispatch(bugAdded("bug 1 redux"));
store.dispatch(bugAdded("bug 2"));
store.dispatch(bugRemoved(1));
store.dispatch(bugResolved(2));
