// src/pages/UsersList.tsx
import { useEffect, useState } from "react";
import type { User } from "../types/user";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, []);

  const handleEdit = async (id: string) => {
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <>
            <li key={user.id} className="border p-2 rounded shadow-sm">
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <button
                onClick={() => handleEdit(user.id)}
                className="text-blue-500 mr-2 p-1"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 p-1"
              >
                Delete
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
