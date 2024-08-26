import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const ClientDetails = () => {
  const initialClients = [
    { id: 'CL001', name: 'John Doe', email: 'john@example.com', transactions: '$5000.00 TX001' },
    { id: 'CL002', name: 'Jane Smith', email: 'jane@example.com', transactions: '$3500.00 TX002' },
    { id: 'CL003', name: 'Michael Johnson', email: 'michael@example.com', transactions: '$7200.00 TX003' },
  ];

  const [clients, setClients] = useState(initialClients);
  const [editIndex, setEditIndex] = useState(null);
  const [editClient, setEditClient] = useState({ id: '', name: '', email: '' });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditClient(clients[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditClient({ ...editClient, [name]: value });
  };

  const handleSaveClick = () => {
    const updatedClients = [...clients];
    updatedClients[editIndex] = editClient;
    setClients(updatedClients);
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
    <div className="flex-grow container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Client Details</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Client ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Contact Information</th>
            <th className="py-2 px-4 border-b">Transactions History</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="id"
                    value={editClient.id}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  client.id
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editClient.name}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  client.name
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    type="email"
                    name="email"
                    value={editClient.email}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  client.email
                )}
              </td>
              <td className="py-2 px-4 border-b">{client.transactions}</td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
};

export default ClientDetails;

