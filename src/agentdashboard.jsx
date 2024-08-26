import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [agentId, setagentId] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    const storedagentId = localStorage.getItem('agentId');
    setagentId(storedagentId);
  }, []);
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    location: "",
    proptype: "",
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    lotSize: 0,
    avail:"available",
    price: 0,
    description: "",
    image: [],
  });

  const [editingProperty, setEditingProperty] = useState(null);
  const [isAddingProperty, setIsAddingProperty] = useState(false);

  useEffect(() => {
    if (!agentId) return; // Ensure agentId is valid before making the call

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
  

  const handleUpdateProperty = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/properties/${editingProperty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProperty),
      });

      if (!response.ok) {
        throw new Error(`Failed to update property: ${response.statusText}`);
      }

      const updatedProperty = await response.json();
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === updatedProperty.id ? updatedProperty : property
        )
      );
      setEditingProperty(null);
    } catch (error) {
      console.error('Error updating property:', error);
      setError(error.message);
    }
  };

  const handleCreateProperty = async () => {
    try {
      const formData = new FormData();
      
      // Append all other properties
      formData.append("location", newProperty.location);
      formData.append("proptype", newProperty.proptype);
      formData.append("bedrooms", newProperty.bedrooms);
      formData.append("bathrooms", newProperty.bathrooms);
      formData.append("squareFeet", newProperty.squareFeet);
      formData.append("lotSize", newProperty.lotSize);
      formData.append("price", newProperty.price);
      formData.append("description", newProperty.description);
      
      // Append the image file
      if (newProperty.image) {
        formData.append("image", newProperty.image);
      }
  
      const response = await fetch(`http://localhost:8080/api/users/${agentId}/properties`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to add property");
      }
      resetNewProperty();
      setIsAddingProperty(false);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };
  
  // Update the handleImageChange function to store the file object
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProperty({ ...newProperty, image: file });
    }
  };
  

  const resetNewProperty = () => {
    setNewProperty({
      location: "",
      proptype: "",
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 0,
      lotSize: 0,
      avail:"available",
      price: 0,
      description: "",
      image: [],
    });
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete property: ${response.statusText}`);
      }
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
      );

      console.log('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      setError(error.message);
    }
  };
  const handleManageTransactionClick = () => {
    navigate('/transactions');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      <div className="flex flex-col min-h-screen">
        <section className="w-full pt-0 md:pt-0 lg:pt-0 border-b">
          <div className="container space-y-10 xl:space-y-16 px-4 md:px-6">
            <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem]">
                  Agent Dashboard
                </h1>
                <br />
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">Manage your properties and Clients.</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Buttons Section */}
        <section className="w-full py-12 md:py-12 lg:py-12 bg-white">
          <div className="container px-2 md:px-6 flex justify-center space-x-64">
            <button
              onClick={() => setIsAddingProperty(true)}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Property
            </button>
            <button
              onClick={handleManageTransactionClick}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Manage Client Requests
            </button>
          </div>
        </section>

        {/* Manage Properties Section */}
      <section className="w-full py-1 md:py-1 lg:py-1 bg-white">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Manage Properties</h2>
          {error && <p className="text-red-600">{error}</p>}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">proptype</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bedrooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(properties) && properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{property.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{property.proptype}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{property.bedrooms}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{property.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditProperty(property)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
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
      </div>
    </section>
        {/* Add Property Modal */}
        {isAddingProperty && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    id="location"
                    type="text"
                    value={newProperty.location}
                    onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="proptype" className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select
                    id="proptype"
                    value={newProperty.proptype}
                    onChange={(e) => setNewProperty({ ...newProperty, proptype: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <option value="Condominium">Condominium</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="MultiFamily">Multi-Family</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                  <input
                    id="bedrooms"
                    type="number"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bedrooms:e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                  <input
                    id="bathrooms"
                    type="number"
                    value={newProperty.bathrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bathrooms:e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700">Square Feet</label>
                  <input
                    id="squareFeet"
                    type="number"
                    value={newProperty.squareFeet}
                    onChange={(e) => setNewProperty({ ...newProperty, squareFeet: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700">Lot Size (sqft)</label>
                  <input
                    id="lotSize"
                    type="number"
                    value={newProperty.lotSize}
                    onChange={(e) => setNewProperty({ ...newProperty, lotSize:e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    id="price"
                    type="number"
                    value={newProperty.price}
                    onChange={(e) => setNewProperty({ ...newProperty, price:e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-700"
                />
              </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
              </form>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={handleCreateProperty}
                    className="py-2 px-4 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAddingProperty(false)}
                    className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
            </div>
          </div>
        )}

        {/* Edit Property Modal */}
        {editingProperty && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
              <form className="space-y-4">
              <div className="space-y-2">
                  <label htmlFor="editLocation" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    id="editLocation"
                    type="text"
                    value={editingProperty.location}
                    onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="editPropType" className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select
                    id="editPropType"
                    value={editingProperty.proptype}
                    onChange={(e) => setEditingProperty({ ...editingProperty, proptype: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <option value="Condominium">Condominium</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="MultiFamily">MultiFamily</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="editBedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                  <input
                    id="editBedrooms"
                    type="number"
                    value={editingProperty.bedrooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms:e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="editBathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                  <input
                    id="editBathrooms"
                    type="number"
                    value={editingProperty.bathrooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms:e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="editSquareFeet" className="block text-sm font-medium text-gray-700">Square Feet</label>
                  <input
                    id="editSquareFeet"
                    type="number"
                    value={editingProperty.squareFeet}
                    onChange={(e) => setEditingProperty({ ...editingProperty,squareFeet:e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="editLotSize" className="block text-sm font-medium text-gray-700">Lot Size (sqft)</label>
                  <input
                    id="editLotSize"
                    type="number"
                    value={editingProperty.lotSize}
                    onChange={(e) => setEditingProperty({ ...editingProperty, lotSize:e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="editPrice" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    id="editPrice"
                    type="number"
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price:e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="editDescription"
                    value={editingProperty.description}
                    onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
              </form>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={handleUpdateProperty}
                    className="py-2 px-4 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingProperty(null)}
                    className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}



