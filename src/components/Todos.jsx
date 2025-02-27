import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
function Todos() {
  const todos = useSelector((state) => state.todos);
  
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const handleUpdateTodo = (id, newText) => {
    setText(newText);
    setEditingId(id);
  };
  const onSave = (id) => {
    dispatch(updateTodo({ id, text }));
    setText("");
    setEditingId(null);
  };
  return (
    <>
      <div className="text-2xl font-bold mb-4">Todos</div>
      <ul className="list-disc pl-5 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded shadow"
          >
            {editingId === todo.id ? (
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-grow mr-2 p-1 border rounded"
              ></input>
            ) : (
              <span>{todo.text}</span>
            )}
            <ul>
              {editingId === todo.id ? (
                <button
                  className="bg-green-300 text-white px-2 py-1 mr-7 rounded hover:bg-green-500"
                  onClick={() => {
                    onSave(todo.id);
                  }}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="bg-yellow-300 text-white px-2 py-1 mr-7 rounded hover:bg-yellow-500"
                    onClick={() => {
                      handleUpdateTodo(todo.id, todo.text);
                    }}
                  >
                    ✏️
                  </button>
                </>
              )}

              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                X
              </button>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
