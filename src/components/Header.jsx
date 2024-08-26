import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userType');
    setUserType(storedUserRole);
  }, []);

  return (
    <header className="bg-white py-4 px-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-black">Real Estate Management</div>
        <nav className="space-x-4">
          <button
            onClick={() => navigate('/home')}
            className="border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/about')}
            className="border-2 border-green-500 text-green-500 py-2 px-4 rounded-full hover:bg-green-500 hover:text-white transition"
          >
            About Us
          </button>
          <button
            onClick={() => navigate('/properties')}
            className="border-2 border-red-500 text-red-500 py-2 px-4 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            Properties
          </button>

          {userType === 'agent' && (
            <button
              onClick={() => navigate('/agent')}
              className="border-2 border-yellow-500 text-yellow-500 py-2 px-4 rounded-full hover:bg-yellow-500 hover:text-white transition"
            >
              Agent
            </button>
          )}

          {userType === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="border-2 border-purple-500 text-purple-500 py-2 px-4 rounded-full hover:bg-purple-500 hover:text-white transition"
            >
              Admin
            </button>
          )}

          <button
            onClick={() => {
              localStorage.removeItem('userType');
              navigate('/');
            }}
            className="border-2 border-gray-500 text-gray-500 py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;



