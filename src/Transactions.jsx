import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [disapprovedTransactions, setDisapprovedTransactions] = useState(new Set());
  const [agentId, setAgentId] = useState('');
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedAgentId = localStorage.getItem('agentId');
    setAgentId(storedAgentId);
  }, []);

  useEffect(() => {
    if (!agentId) return;

    const fetchProperties = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${agentId}/properties`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [agentId]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/transactions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
        filterTransactions(data, properties);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [properties]);

  const filterTransactions = (transactions, properties) => {
    const propertyIds = new Set(properties.map(property => property.id));
    const filtered = transactions.filter(transaction => propertyIds.has(transaction.propertyId));
    setFilteredTransactions(filtered);
  };

  const handleApprove = async (id, propertyId) => {
    try {
      // Update the transaction status locally
      setFilteredTransactions(filteredTransactions.map(transaction =>
        transaction.id === id ? { ...transaction, status: 'Approved' } : transaction
      ));

      // Send request to update property status
      const response = await fetch(`http://localhost:8080/api/properties/${propertyId}/update-status?avail=Sold`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error updating property status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error approving transaction:', error);
    }
  };

  const handleDisapprove = (id) => {
    setDisapprovedTransactions(new Set(disapprovedTransactions).add(id));
    setFilteredTransactions(filteredTransactions.map(transaction =>
      transaction.id === id ? { ...transaction, status: 'Disapproved' } : transaction
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">ID</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Client ID</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Amount</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Client Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Property ID</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left" style={{ minWidth: '150px' }}>Transaction ID</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => {
              const isDisapproved = disapprovedTransactions.has(transaction.id);
              const status = isDisapproved ? 'Disapproved' : (transaction.status || 'Pending');
              const rowColor = status === 'Approved' ? 'bg-green-100' : (status === 'Disapproved' ? 'bg-red-100' : 'bg-white');

              return (
                <tr key={transaction.id} className={rowColor}>
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.clientId}</td>
                  <td className="py-2 px-4 border-b border-gray-200">₹{transaction.amount.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.clientName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.propertyId}</td>
                  <td className="py-2 px-4 border-b border-gray-200" style={{ minWidth: '150px' }}>{transaction.transactionId}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {!isDisapproved && status !== 'Approved' ? (
                      <>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                          onClick={() => handleApprove(transaction.id, transaction.propertyId)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                          onClick={() => handleDisapprove(transaction.id)}
                        >
                          Disapprove
                        </button>
                      </>
                    ) : status === 'Disapproved' ? (
                      <span className="text-red-500 font-bold">Disapproved</span>
                    ) : (
                      <span className="text-green-500 font-bold">Approved</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default TransactionTable;












