import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getUnresolvedBugs,
  bugAssignedToUser,
  getBugsByUser,
} from "./store/bugs";
import getStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = getStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});

store.dispatch(bugAdded({ description: "Bug1" }));
store.dispatch(bugAdded({ description: "Bug2" }));
store.dispatch(bugAdded({ description: "Bug3" }));
store.dispatch(bugRemoved({ id: 1 }));
store.dispatch(bugResolved({ id: 2 }));
store.dispatch(bugAssignedToUser({ userId: 1, bugId: 3 }));
store.dispatch(projectAdded({ name: "Abhinav redux project" }));
store.dispatch(userAdded({ name: "Abhinav" }));
store.dispatch(userAdded({ name: "Neha" }));

console.log(getUnresolvedBugs(store.getState()));
console.log(getBugsByUser(1)(store.getState()));
