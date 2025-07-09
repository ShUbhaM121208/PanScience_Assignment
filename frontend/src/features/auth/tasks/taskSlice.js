// src/features/auth/tasks/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Optionally, add a reducer to add a single task
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    // Optionally, add a reducer to remove a task
    removeTask: (state, action) => {
      state.list = state.list.filter(task => task.id !== action.payload);
    },
  },
});

export const { setTasks, setLoading, setError, addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
