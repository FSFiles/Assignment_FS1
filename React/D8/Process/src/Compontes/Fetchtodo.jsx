import React, { useEffect, useState } from "react";

export const TodosTable = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch("https://dummyjson.com/todos");
    const data = await res.json();
    setTodos(data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h2>Todos List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Status</th>
            <th>User ID</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.todo}</td>
              <td>{e.completed ? "✅ Done" : "❌ Pending"}</td>
              <td>{e.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};