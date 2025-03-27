import React, { useEffect, useState } from "react";
import "../styles/AdminUsersPage.css";
import { useAuth } from "../context/AuthContext";

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "attendee" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "organizer" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "admin" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "attendee" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "organizer" },
];

const AdminUsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // BACKEND: Replace with API call to fetch all users
    console.log("Fetching users... (mock)");
    setUsers(mockUsers);
  }, []);

  const handleRemove = (id) => {
    // BACKEND: Replace with API call to delete user
    const confirmed = window.confirm("Are you sure you want to remove this user?");
    if (confirmed) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-users-page">
        <h2 className="text-red-600">Access Denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <h1>User Management</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleRemove(u.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-row">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
