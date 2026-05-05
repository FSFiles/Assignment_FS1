import React, { useEffect, useState } from "react";

export const FetchToDo = () => {
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

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Status</th>
            <th>User ID</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.todo}</td>
              <td>{t.completed?"Yes":"No"}</td>
              <td>{t.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FetchToDo