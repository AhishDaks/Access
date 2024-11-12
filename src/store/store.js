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
  initialState: { taskData: null },
  reducers: {
    addTask(state, action) {
      state.taskData = action.payload;
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

const employeesUnder = createSlice({
  name: "employeeunder",
  initialState: null,
  reducers: {
    addDesiredEmployee(state, action) {
      let employeeData = action.payload.map((a) => a[0]);
      return employeeData;
    },
    removeDesiredEmployee(state, action) {
      return null;
    },
  },
});

const store = configureStore({
  reducer: {
    user: users.reducer,
    task: tasks.reducer,
    loggedIn: loggedInuser.reducer,
    employeeUnder: employeesUnder.reducer,
  },
});

export { store };

export const { addUser } = users.actions;

export const { addTask } = tasks.actions;

export const { addLoggedIn, removeLoggedIn } = loggedInuser.actions;

export const { addDesiredEmployee, removeDesiredEmployee } =
  employeesUnder.actions;
