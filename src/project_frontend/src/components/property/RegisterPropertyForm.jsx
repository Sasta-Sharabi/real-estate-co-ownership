import React, { useState } from 'react';
import { Building, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthProvider';

const RegisterPropertyForm = () => {
  const { callFunction, isAuth, login } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'Residential',
    totalValue: '',
    availableShares: '',
    pricePerShare: '',
    description: '',
    amenities: [],
    images: [],
    monthlyRent: ''
  });

  const [loading, setLoading] = useState(false);

  const propertyTypes = [
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Industrial', label: 'Industrial' },
    { value: 'MixedUse', label: 'Mixed Use' }
  ];

  const amenityOptions = [
    'Parking', 'Pool', 'Gym', 'Security', 'Garden', 'Balcony',
    'Air Conditioning', 'Heating', 'Elevator', 'Storage'
  ];

  const amenityMap = {
    'Air Conditioning': 'AirConditioning',
    'Parking': 'Parking',
    'Pool': 'Pool',
    'Gym': 'Gym',
    'Security': 'Security',
    'Garden': 'Garden',
    'Balcony': 'Balcony',
    'Heating': 'Heating',
    'Elevator': 'Elevator',
    'Storage': 'Storage'
  };

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
      if (!callFunction) throw new Error("callFunction not connected");

      const amenitiesEnum = formData.amenities.map(a => amenityMap[a]) || [];

      const response = await callFunction.register_property(
        formData.title,
        formData.address,
        formData.city,
        formData.state,
        Number(formData.zipCode),
        formData.propertyType,
        BigInt(formData.totalValue),
        BigInt(formData.availableShares),
        BigInt(formData.pricePerShare),
        formData.description,
        amenitiesEnum,
        formData.images,
        BigInt(formData.monthlyRent || 0)
      );

      console.log(response);
      alert(response);

      // Reset form
      setFormData({
        title: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        propertyType: 'Residential',
        totalValue: '',
        availableShares: '',
        pricePerShare: '',
        description: '',
        amenities: [],
        images: [],
        monthlyRent: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error registering property: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h1>
        <p className="text-gray-600 mb-6">Please log in to register a property.</p>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

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

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Street address"
              required
            />

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

          {/* Image URLs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URLs (comma-separated)
            </label>
            <div className="flex items-center space-x-2 mb-1">
              <ImageIcon className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                name="images"
                value={formData.images.join(',')}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    images: e.target.value.split(',').map(url => url.trim()).filter(Boolean)
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>
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

          {/* Monthly Rent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Rent ($)
            </label>
            <input
              type="number"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3000"
              required
            />
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

