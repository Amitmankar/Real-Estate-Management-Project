import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const PropertyCard = ({ id, proptype, imageString, location, bedrooms, bathrooms, squareFeet, price, avail, onBuy }) => {
  const imageUrl = imageString ? `data:image/jpeg;base64,${imageString}` : 'default-image-url.jpg';
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={imageUrl} alt={proptype} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">{proptype}</h3>
      <div className="flex items-center mb-2">
        <span className="mr-2">🛏️ {bedrooms} bedrooms</span>
        <span className="mr-2">🛁 {bathrooms} bathrooms</span>
        <span>📏 {squareFeet} sq ft</span>
      </div>
      <div className="text-lg font-semibold mb-4">₹{price}</div>
      <div className="text-lg mb-4">Availability: {avail}</div>
      <div className="text-lg mb-4">Location: {location}</div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => onBuy(id, price)}
          disabled={avail === 'Sold'} // Disable button if property is sold
        >
          Buy
        </button>
      </div>
    </div>
  );
};

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId');
    const storedClientName = localStorage.getItem('clientName');
    if (storedClientId) setClientId(storedClientId);
    if (storedClientName) setClientName(storedClientName);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/properties');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Filter out properties where avail is 'Sold'
        const availableProperties = data.filter(property => property.avail !== 'Sold');
        setAllProperties(availableProperties);
        setProperties(availableProperties);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/properties/search?location=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Filter out properties where avail is 'Sold'
      const availableProperties = data.filter(property => property.avail !== 'Sold');
      setProperties(availableProperties);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setProperties(allProperties);
  };

  const handleBuyClick = async (propertyId, price) => {
    if (!clientId && !clientName) return; 
    try {
      const response = await fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: clientId,
          clientName: clientName,
          amount: price,
          propertyId: propertyId
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('The request has been sent to the Agent');
    } catch (error) {
      alert('Request failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6 flex">
          <input
            type="text"
            placeholder="Search properties by location"
            value={searchQuery}
            onChange={handleChange}
            className="w-full p-2 border rounded-l-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded-r-lg"
          >
            Search
          </button>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-black p-4">Featured Properties</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {properties.length > 0 ? (
              properties.map((property, index) => (
                <PropertyCard key={index} {...property} onBuy={handleBuyClick} />
              ))
            ) : (
              <div>No properties found</div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PropertiesPage;




