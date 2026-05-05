import React, { useEffect, useState } from "react";

const FetchUsers = () => {
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
        {users.map((u) => (
          <div
            key={u.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              width: "200px",
              borderRadius: "10px",
            }}
          >
            <img src={u.image} alt="" width="100%" />
            <h4>{u.firstName} {u.lastName}</h4>
            <p>{u.email}</p>
            <p>Age: {u.age}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FetchUsers