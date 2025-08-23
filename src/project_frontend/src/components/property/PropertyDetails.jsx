import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building, MapPin, DollarSign, Users, Calendar, ArrowLeft, Share2, Heart } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [shareAmount, setShareAmount] = useState(1);

  // Mock property data
  const mockProperty = {
    id: 1,
    title: 'Modern Downtown Apartment',
    address: '123 Main St, New York, NY 10001',
    propertyType: 'residential',
    totalValue: 500000,
    availableShares: 75,
    totalShares: 100,
    pricePerShare: 5000,
    monthlyRent: 3500,
    yearBuilt: 2020,
    squareFeet: 1200,
    bedrooms: 2,
    bathrooms: 2,
    description: 'This stunning modern apartment features high-end finishes, floor-to-ceiling windows, and breathtaking city views. Located in the heart of downtown, it offers easy access to restaurants, shopping, and public transportation. The building includes premium amenities and 24/7 concierge service.',
    images: [
      '/building.png',
      '/popular.png',
      'residential.png'
    ],
    amenities: ['Parking', 'Gym', 'Security', 'Pool', 'Concierge', 'Rooftop Deck'],
    financials: {
      monthlyIncome: 3500,
      monthlyExpenses: 1200,
      netMonthlyIncome: 2300,
      annualReturn: 5.52
    },
    createdAt: '2024-01-15'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperty(mockProperty);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInvest = () => {
    const totalCost = shareAmount * property.pricePerShare;
    alert(`Investment of ${shareAmount} shares for $${totalCost.toLocaleString()} initiated!`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-300 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
        <Link to="/properties" className="text-blue-600 hover:text-blue-700">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Back Button */}
      <Link
        to="/properties"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Properties</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={property.images[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Property Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.address}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{property.squareFeet}</div>
                <div className="text-sm text-gray-600">Sq Ft</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{property.yearBuilt}</div>
                <div className="text-sm text-gray-600">Built</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Performance */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-700">
                    ${property.financials.monthlyIncome.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600">Monthly Income</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-700">
                    ${property.financials.monthlyExpenses.toLocaleString()}
                  </div>
                  <div className="text-sm text-red-600">Monthly Expenses</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-700">
                    ${property.financials.netMonthlyIncome.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600">Net Monthly</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-700">
                    {property.financials.annualReturn}%
                  </div>
                  <div className="text-sm text-purple-600">Annual Return</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Investment Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Property Type</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {property.propertyType}
                </span>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${property.pricePerShare.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">per share</div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Value:</span>
                <span className="font-semibold">${property.totalValue.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Available Shares:</span>
                <span className="font-semibold text-green-600">
                  {property.availableShares}/{property.totalShares}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Rent:</span>
                <span className="font-semibold">${property.monthlyRent.toLocaleString()}</span>
              </div>
            </div>

            {/* Share Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Shares
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShareAmount(Math.max(1, shareAmount - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={shareAmount}
                  onChange={(e) => setShareAmount(Math.max(1, Math.min(property.availableShares, parseInt(e.target.value) || 1)))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max={property.availableShares}
                />
                <button
                  onClick={() => setShareAmount(Math.min(property.availableShares, shareAmount + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Max: {property.availableShares} shares
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Investment Amount:</span>
                <span className="text-xl font-bold text-gray-900">
                  ${(shareAmount * property.pricePerShare).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Monthly Income (est.):</span>
                <span className="font-semibold text-green-600">
                  ${Math.round((shareAmount / property.totalShares) * property.financials.netMonthlyIncome).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Investment Button */}
            <button
              onClick={handleInvest}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold"
            >
              Invest Now
            </button>

            <div className="text-xs text-gray-500 mt-3 text-center">
              By investing, you agree to our terms and conditions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;