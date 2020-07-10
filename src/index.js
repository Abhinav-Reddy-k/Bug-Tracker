import { bugAdded, bugRemoved, bugResolved, bugDifficulty } from "./store/bugs";
import configureStore from "./store/configureStore";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});

store.dispatch(bugAdded("bug 1 redux"));
store.dispatch(bugAdded("bug 2"));
store.dispatch(bugRemoved(1));
store.dispatch(bugResolved(2));
store.dispatch(bugDifficulty(2, "very Difficult"));
