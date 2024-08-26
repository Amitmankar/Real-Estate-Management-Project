import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import backgroundImage from './pexels-chaitaastic-1796727.jpg';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="bg-white bg-opacity-80 max-w-2xl w-full p-8 rounded-md shadow-lg">
          {/* Text Section */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-black">Find Your Dream Home</h1>
            <p className="text-lg text-gray-800 mt-4">
            Discover a comprehensive and user-friendly platform designed to simplify real estate transactions and property management. Our Real Estate Management System is tailored for agents, clients, and administrators, offering an array of powerful features to streamline every aspect of your real estate journey.Search through our extensive database of properties and find the perfect home for you.
            </p>
            <form className="flex mt-8">
              <button 
                onClick={() => navigate('/properties')}
                type="button"  // Changed to 'button' to prevent form submission
                className="bg-black text-white hover:bg-gray-800 p-2 rounded-full w-64"
              >
              Search for Properties
              </button>
            </form>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;


