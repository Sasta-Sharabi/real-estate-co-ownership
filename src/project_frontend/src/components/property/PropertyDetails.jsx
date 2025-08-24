
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Heart 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthProvider';

const PropertyDetails = () => {
  const { callFunction } = useAuth();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [shareAmount, setShareAmount] = useState(1);

  // Normalize backend object → frontend-friendly shape
  const normalizeProperty = (prop) => {
    // extract property type key from {Residential: null}
    const propertyType = prop.property_type
      ? Object.keys(prop.property_type)[0]
      : "Unknown";

    // flatten amenities like [{Pool: null}, {Heating: null}] → ["Pool", "Heating"]
    const amenities = prop.amenities && prop.amenities.length > 0
      ? prop.amenities.map((a) => Object.keys(a)[0])
      : ["Parking", "Gym", "Security"];

    return {
      id: Number(prop.id),
      title: prop.title,
      address: prop.address
        ? `${prop.address.street}, ${prop.address.city}, ${prop.address.state} ${Number(prop.address.zipcode)}`
        : "No address available",
      propertyType,
      totalValue: Number(prop.financial_details?.total_property_value ?? 0),
      availableShares: Number(prop.financial_details?.available_shares ?? 0),
      totalShares: Number(prop.financial_details?.total_property_value / prop.financial_details?.price_per_share ?? 0),
      pricePerShare: Number(prop.financial_details?.price_per_share ?? 0),
      monthlyRent: Number(prop.monthly_rent ?? 0),
      collectedRent: Number(prop.collected_rent ?? 0),
      yearBuilt: prop.year_built ? Number(prop.year_built) : "N/A",
      squareFeet: prop.square_feet ? Number(prop.square_feet) : "N/A",
      bedrooms: prop.bedrooms ? Number(prop.bedrooms) : "N/A",
      bathrooms: prop.bathrooms ? Number(prop.bathrooms) : "N/A",
      description: prop.property_description || "No description provided.",
      images: prop.images && prop.images.length > 0 
        ? prop.images 
        : ["/building.png", "/popular.png", "/residential.png"],
      amenities,
      financials: {
        monthlyIncome: Number(prop.monthly_rent ?? 0),
        monthlyExpenses: 0, // not provided by backend
        netMonthlyIncome: Number(prop.monthly_rent ?? 0) - 0,
        annualReturn: prop.financial_details?.total_property_value
          ? ((Number(prop.monthly_rent ?? 0) * 12) / Number(prop.financial_details.total_property_value) * 100).toFixed(2)
          : 0,
      },
      createdAt: prop.created_at || "N/A"
    };
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const allProps = await callFunction.get_all_properties();
        const found = allProps.find((p) => Number(p.id) === Number(id));

        if (found) {
          const normalized = normalizeProperty(found);
          setProperty(normalized);
        } else {
          setProperty(null);
        }
      } catch (err) {
        console.error("❌ Error fetching property:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInvest = async () => {
    if (!property) return;

    if (shareAmount <= 0) {
      alert("Please enter a valid number of shares.");
      return;
    }

    if (shareAmount > property.availableShares) {
      alert(`Cannot buy more than ${property.availableShares} shares.`);
      return;
    }

    try {
      // Call the backend function
      const result = await callFunction.buy_share(property.id, BigInt(shareAmount));
      
      // Show backend response
      alert(result);

      // Refresh property to update available shares
      const allProps = await callFunction.get_all_properties();
      const updatedProperty = allProps.find((p) => Number(p.id) === Number(property.id));
      if (updatedProperty) {
        setProperty(normalizeProperty(updatedProperty));
        setShareAmount(1); // reset input
      }
    } catch (err) {
      console.error("❌ Error buying shares:", err);
      alert("Failed to buy shares. Check console for details.");
    }
  };


  if (loading) {
    return <div className="max-w-7xl mx-auto p-6">Loading...</div>;
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
      <Link to="/properties" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Properties</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div>
          <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <img src={property.images[selectedImage]} alt={property.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {property.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-blue-600" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-gray-600 flex items-center mt-2">
              <MapPin className="h-5 w-5 mr-2" />
              {property.address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-gray-500" />
              <span>{property.propertyType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Built in {property.yearBuilt}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span>{property.bedrooms} Beds · {property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center space-x-2">
              <Share2 className="h-5 w-5 text-gray-500" />
              <span>{property.squareFeet} sq ft</span>
            </div>
          </div>

          <p className="text-gray-700">{property.description}</p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Total Property Value</span>
              <span className="font-semibold">${property.totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Price per Share</span>
              <span className="font-semibold">${property.pricePerShare.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Available Shares</span>
              <span className="font-semibold">{property.availableShares} / {property.totalShares}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <input
              type="number"
              min="1"
              max={property.availableShares}
              value={shareAmount}
              onChange={(e) => setShareAmount(Number(e.target.value))}
              className="w-24 p-2 border rounded-lg"
            />
            <button
              onClick={handleInvest}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Invest Now
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Heart className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Monthly Income</div>
            <div className="text-lg font-semibold">${property.financials.monthlyIncome.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Monthly Expenses</div>
            <div className="text-lg font-semibold">${property.financials.monthlyExpenses.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Net Income</div>
            <div className="text-lg font-semibold">${property.financials.netMonthlyIncome.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Annual Return</div>
            <div className="text-lg font-semibold">{property.financials.annualReturn}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
