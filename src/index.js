import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getUnresolvedBugs,
} from "./store/bugs";
import getStore from "./store/configureStore";
import { projectAdded } from "./store/projects";

const store = getStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});

store.dispatch(bugAdded({ description: "Bug1" }));
store.dispatch(bugAdded({ description: "Bug2" }));
store.dispatch(bugAdded({ description: "Bug3" }));
store.dispatch(bugRemoved({ id: 1 }));
store.dispatch(bugResolved({ id: 2 }));
store.dispatch(projectAdded({ name: "Abhinav redux project" }));

console.log(getUnresolvedBugs(store.getState()));
