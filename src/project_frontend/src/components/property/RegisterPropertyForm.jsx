import React, { useState } from 'react';
import { Building, MapPin, DollarSign, Users, Calendar, Upload } from 'lucide-react';

const RegisterPropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'residential',
    totalValue: '',
    availableShares: '',
    pricePerShare: '',
    description: '',
    amenities: [],
    images: []
  });

  const [loading, setLoading] = useState(false);

  const propertyTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'mixed-use', label: 'Mixed Use' }
  ];

  const amenityOptions = [
    'Parking', 'Pool', 'Gym', 'Security', 'Garden', 'Balcony', 
    'Air Conditioning', 'Heating', 'Elevator', 'Storage'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Property registered:', formData);
      alert('Property registered successfully!');
      
      // Reset form
      setFormData({
        title: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        propertyType: 'residential',
        totalValue: '',
        availableShares: '',
        pricePerShare: '',
        description: '',
        amenities: [],
        images: []
      });
    } catch (error) {
      alert('Error registering property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Register New Property</h2>
          </div>
          <p className="text-gray-600 mt-1">Add a new property for co-ownership investment</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter property title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Address</h3>
            </div>
            
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Street address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="State"
                required
              />
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ZIP Code"
                required
              />
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Financial Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Property Value ($)
                </label>
                <input
                  type="number"
                  name="totalValue"
                  value={formData.totalValue}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="500000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Shares
                </label>
                <input
                  type="number"
                  name="availableShares"
                  value={formData.availableShares}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Share ($)
                </label>
                <input
                  type="number"
                  name="pricePerShare"
                  value={formData.pricePerShare}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the property, its features, and investment potential..."
              required
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {amenityOptions.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Registering...' : 'Register Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPropertyForm;