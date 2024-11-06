import { configureStore, createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    addUser(state, action) {
      state.users = [...state.users, ...action.payload];
    },
  },
});

const tasks = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push(...action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    user: users.reducer,
    task: tasks.reducer,
  },
});

export { store };

export const { addUser } = users.actions;

export const { addTask } = tasks.actions;
