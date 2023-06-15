import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "mobx-react";
import history from "./history";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { HashRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import TasksService from "./services/tasks.service";
import TasksStore from "./stores/tasks.store";
import UserStore from "./stores/user.store";
import AuthService from "./services/auth.service";

const services = {};
const stores = {};

stores.routerStore = new RouterStore();
const historyWithStore = syncHistoryWithStore(history, stores.routerStore);

services.tasksService = new TasksService(stores.routerStore);
services.authService = new AuthService();

stores.tasksStore = new TasksStore(services.tasksService);
stores.userStore = new UserStore(services.authService);

const rootElement = document.getElementById("root");
const newRoot = createRoot(rootElement);

newRoot.render(
  <Provider {...stores}>
    <HashRouter history={historyWithStore}>
      <App />
    </HashRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
