import { configureStore, createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: { data: null },
  reducers: {
    addUser(state, action) {
      state.data = action.payload;
    },
    clearUser(state, action) {
      state.data = null;
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
    clearTask(state, action) {
      state.taskData = null;
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

const loggedInuserTasks = createSlice({
  name: "loggedinTask",
  initialState: null,
  reducers: {
    addLoggedInTask(state, action) {
      return action.payload;
    },
    removeLoggedInTask(state, action) {
      return null;
    },
  },
});

const employeesUnder = createSlice({
  name: "employeeunder",
  initialState: null,
  reducers: {
    addDesiredEmployee(state, action) {
      let employeeData = action.payload;
      return employeeData;
    },
    removeDesiredEmployee(state, action) {
      return null;
    },
  },
});

const coWorkers = createSlice({
  name: "coWorker",
  initialState: null,
  reducers: {
    addCoWorker(state, action) {
      return action.payload;
    },
    clearCoWorker(state, action) {
      return null;
    },
  },
});

const noManagerEmployees = createSlice({
  name: "noManager",
  initialState: null,
  reducers: {
    fetchnoManagerEmployee(state, action) {
      return action.payload;
    },
    clearManagerEmployee(state, action) {
      return null;
    },
  },
});
const store = configureStore({
  reducer: {
    user: users.reducer,
    task: tasks.reducer,
    loggedIn: loggedInuser.reducer,
    loggedInTask: loggedInuserTasks.reducer,
    employeeUnder: employeesUnder.reducer,
    coWorker: coWorkers.reducer,
    noManagerEmployee: noManagerEmployees.reducer,
  },
});

export { store };

export const { addUser, clearUser } = users.actions;

export const { addTask, clearTask } = tasks.actions;

export const { addLoggedIn, removeLoggedIn } = loggedInuser.actions;

export const { addDesiredEmployee, removeDesiredEmployee } =
  employeesUnder.actions;

export const { addLoggedInTask, removeLoggedInTask } =
  loggedInuserTasks.actions;

export const { addCoWorker, clearCoWorker } = coWorkers.actions;

export const { fetchnoManagerEmployee, clearManagerEmployee } =
  noManagerEmployees.actions;
