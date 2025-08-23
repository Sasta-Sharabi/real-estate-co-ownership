import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, DollarSign, Users, Eye, Filter } from 'lucide-react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data
  const mockProperties = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      address: '123 Main St, New York, NY 10001',
      propertyType: 'residential',
      totalValue: 500000,
      availableShares: 75,
      totalShares: 100,
      pricePerShare: 5000,
      monthlyRent: 3500,
      images: ['/building.png'],
      amenities: ['Parking', 'Gym', 'Security'],
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Commercial Office Space',
      address: '456 Business Ave, Los Angeles, CA 90210',
      propertyType: 'commercial',
      totalValue: 1200000,
      availableShares: 40,
      totalShares: 120,
      pricePerShare: 10000,
      monthlyRent: 8500,
      images: ['popular.png'],
      amenities: ['Parking', 'Security', 'Elevator'],
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: 'Luxury Beachfront Condo',
      address: '789 Ocean Dr, Miami, FL 33139',
      propertyType: 'residential',
      totalValue: 800000,
      availableShares: 20,
      totalShares: 80,
      pricePerShare: 10000,
      monthlyRent: 5500,
      images: ['/residential.png'],
      amenities: ['Pool', 'Gym', 'Security', 'Balcony'],
      createdAt: '2024-01-05'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true;
    return property.propertyType === filter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price-high':
        return b.pricePerShare - a.pricePerShare;
      case 'price-low':
        return a.pricePerShare - b.pricePerShare;
      default:
        return 0;
    }
  });

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Properties</h1>
          <p className="text-gray-600">Discover co-ownership investment opportunities</p>
        </div>
        
        <Link
          to="/properties/register"
          className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
        >
          <Building className="h-5 w-5" />
          <span>Register Property</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="mixed-use">Mixed Use</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProperties.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {property.propertyType}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Value:</span>
                  <span className="font-semibold">${property.totalValue.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Price per Share:</span>
                  <span className="font-semibold">${property.pricePerShare.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Rent:</span>
                  <span className="font-semibold">${property.monthlyRent.toLocaleString()}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Available Shares:</span>
                  <span className={`font-semibold ${getAvailabilityColor(property.availableShares, property.totalShares)}`}>
                    {property.availableShares}/{property.totalShares}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${((property.totalShares - property.availableShares) / property.totalShares) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map(amenity => (
                    <span key={amenity} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/properties/${property.id}`}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {sortedProperties.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later for new listings.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;