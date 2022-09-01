import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import { chatReducer } from "./reducers/chatReducers";
import { folderReducer } from "./reducers/folderReducers";
import { notificationReducer } from "./reducers/notificationReducers";
import { userReducer } from "./reducers/userReducers";
import {
  teamsReducer,
  acceptedTeamsReducer,
  selectedTeamIdReducer,
} from "./reducers/teamReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "chat", "selectedTeamId", "acceptedTeams"],
};

const reducer = combineReducers({
  chat: chatReducer,
  folder: folderReducer,
  notification: notificationReducer,
  user: userReducer,
  teams: teamsReducer,
  acceptedTeams: acceptedTeamsReducer,
  selectedTeamId: selectedTeamIdReducer,
});

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store);

export { store, persistor };
