import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

const API_BASE_URL = "http://localhost:8080/api/users"; // Update with your backend API URL

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    type: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isViewUsersOpen, setIsViewUsersOpen] = useState(true);

  // Fetch all users on component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("There was an error fetching the users!", error));
  }, []);

  const handleCreateUser = () => {
    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        setNewUser({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          type: "",
        });
        setIsCreateUserOpen(false);
      })
      .catch(error => console.error("There was an error creating the user!", error));
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      fetch(`http://localhost:8080/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      })
        .then(() => {
          setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
          setEditingUser(null);
        })
        .catch(error => console.error("There was an error updating the user!", error));
    }
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch(error => console.error("There was an error deleting the user!", error));
  };

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
    setIsCreateUserOpen(true);
    setIsViewUsersOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col min-h-screen">
        <section className="w-full pt-0 md:pt-0 lg:pt-0 border-b">
          <div className="container space-y-10 xl:space-y-16 px-4 md:px-6">
            <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem]">
                  Admin Dashboard
                </h1>
                <br />
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Manage users and their roles.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-5 md:py-5 lg:py-5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-4 w-full max-w-md">
                <button
                  onClick={() => {
                    setIsCreateUserOpen(true);
                    setIsViewUsersOpen(false);
                  }}
                  className="py-2 px-4 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create User
                </button>
                <button
                  onClick={() => {
                    setIsCreateUserOpen(false);
                    setIsViewUsersOpen(true);
                  }}
                  className="py-2 px-4 bg-red-400 text-white rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-4"
                >
                  View Users
                </button>
              </div>

              {isCreateUserOpen && (
                <div className="space-y-2 w-full max-w-md mt-8">
                  <h2 className="text-2xl font-bold">{editingUser ? 'Edit User' : 'Create New User'}</h2>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        id="name"
                        value={editingUser ? editingUser.name : newUser.name}
                        onChange={(e) => {
                          if (editingUser) {
                            setEditingUser({ ...editingUser, name: e.target.value });
                          } else {
                            setNewUser({ ...newUser, name: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={editingUser ? editingUser.email : newUser.email}
                        onChange={(e) => {
                          if (editingUser) {
                            setEditingUser({ ...editingUser, email: e.target.value });
                          } else {
                            setNewUser({ ...newUser, email: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={editingUser ? editingUser.password : newUser.password}
                        onChange={(e) => {
                          if (editingUser) {
                            setEditingUser({ ...editingUser, password: e.target.value });
                          } else {
                            setNewUser({ ...newUser, password: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        value={editingUser ? editingUser.phoneNumber : newUser.phoneNumber}
                        onChange={(e) => {
                          if (editingUser) {
                            setEditingUser({ ...editingUser, phoneNumber: e.target.value });
                          } else {
                            setNewUser({ ...newUser, phoneNumber: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        id="type"
                        value={editingUser ? editingUser.type : newUser.type}
                        onChange={(e) => {
                          if (editingUser) {
                            setEditingUser({ ...editingUser, type: e.target.value });
                          } else {
                            setNewUser({ ...newUser, type: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="admin">Admin</option>
                        <option value="agent">Agent</option>
                        <option value="client">Client</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={editingUser ? handleUpdateUser : handleCreateUser}
                      className="w-full py-2 px-4 text-white bg-slate-600 hover:bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {editingUser ? 'Update User' : 'Create User'}
                    </button>
                  </form>
                </div>
              )}

              {isViewUsersOpen && (
                <div className="space-y-2 w-full max-w-4xl mt-8">
                  <h2 className="text-2xl font-bold">Users</h2>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-700 tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-700 tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-700 tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-700 tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-700 tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 border-b border-gray-300">{user.name}</td>
                          <td className="px-6 py-4 border-b border-gray-300">{user.email}</td>
                          <td className="px-6 py-4 border-b border-gray-300">{user.phoneNumber}</td>
                          <td className="px-6 py-4 border-b border-gray-300">{user.type}</td>
                          <td className="px-6 py-4 border-b border-gray-300">
                            <button
                              onClick={() => handleEditClick(user)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 ml-4"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}



