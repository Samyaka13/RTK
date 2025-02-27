import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "Hello World" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: action.payload.text } : todo
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions; //We are exporting indiviudal reducers so that we can use them in components
export default todoSlice.reducer; // We are exporting these reducer list for using them in store 
