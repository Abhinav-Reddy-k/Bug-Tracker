import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getUnresolvedBugs,
  bugAssignedToUser,
  getBugsByUser,
  loadBugs,
  addBugs,
  resoleBug,
} from "./store/bugs";
import getStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = getStore();

store.dispatch(loadBugs());
setTimeout(() => store.dispatch(resoleBug(3)), 1000);
