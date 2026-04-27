import React, { useEffect, useState } from "react";

export const UsersCards = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("https://dummyjson.com/users");
    const data = await res.json();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h2>User Cards</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {users.map((e) => (
          <div
            key={e.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              width: "200px",
              borderRadius: "10px",
            }}
          >
            <img src={e.image} alt="" width="100%" />
            <h4>{e.firstName} {e.lastName}</h4>
            <p>{e.email}</p>
            <p>Age: {e.age}</p>
          </div>
        ))}
      </div>
    </>
  );
};