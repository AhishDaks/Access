import { configureStore, createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: { data: null },
  reducers: {
    addUser(state, action) {
      state.data = action.payload;
    },
  },
});

const tasks = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push(...state, ...action.payload);
    },
  },
});

const loggedInuser = createSlice({
  name: "logged",
  initialState: null,
  reducers: {
    addLoggedIn(state, action) {
      return action.payload;
    },
    removeLoggedIn(state, action) {
      return null;
    },
  },
});
const store = configureStore({
  reducer: {
    user: users.reducer,
    task: tasks.reducer,
    loggedIn: loggedInuser.reducer,
  },
});

export { store };

export const { addUser } = users.actions;

export const { addTask } = tasks.actions;

export const { addLoggedIn, removeLoggedIn } = loggedInuser.actions;
