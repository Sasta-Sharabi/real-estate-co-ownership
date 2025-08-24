// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Building, MapPin, DollarSign, Users, Calendar, ArrowLeft, Share2, Heart } from 'lucide-react';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [shareAmount, setShareAmount] = useState(1);

//   // Mock property data
//   const mockProperty = {
//     id: 1,
//     title: 'Modern Downtown Apartment',
//     address: '123 Main St, New York, NY 10001',
//     propertyType: 'residential',
//     totalValue: 500000,
//     availableShares: 75,
//     totalShares: 100,
//     pricePerShare: 5000,
//     monthlyRent: 3500,
//     yearBuilt: 2020,
//     squareFeet: 1200,
//     bedrooms: 2,
//     bathrooms: 2,
//     description: 'This stunning modern apartment features high-end finishes, floor-to-ceiling windows, and breathtaking city views. Located in the heart of downtown, it offers easy access to restaurants, shopping, and public transportation. The building includes premium amenities and 24/7 concierge service.',
//     images: [
//       '/building.png',
//       '/popular.png',
//       'residential.png'
//     ],
//     amenities: ['Parking', 'Gym', 'Security', 'Pool', 'Concierge', 'Rooftop Deck'],
//     financials: {
//       monthlyIncome: 3500,
//       monthlyExpenses: 1200,
//       netMonthlyIncome: 2300,
//       annualReturn: 5.52
//     },
//     createdAt: '2024-01-15'
//   };

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setProperty(mockProperty);
//       setLoading(false);
//     }, 1000);
//   }, [id]);

//   const handleInvest = () => {
//     const totalCost = shareAmount * property.pricePerShare;
//     alert(`Investment of ${shareAmount} shares for $${totalCost.toLocaleString()} initiated!`);
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="h-96 bg-gray-300 rounded-lg"></div>
//             <div className="space-y-4">
//               <div className="h-6 bg-gray-300 rounded w-3/4"></div>
//               <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//               <div className="h-20 bg-gray-300 rounded"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
//         <Link to="/properties" className="text-blue-600 hover:text-blue-700">
//           Back to Properties
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Back Button */}
//       <Link
//         to="/properties"
//         className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
//       >
//         <ArrowLeft className="h-5 w-5" />
//         <span>Back to Properties</span>
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Images and Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="relative h-96 rounded-lg overflow-hidden">
//               <img
//                 src={property.images[selectedImage]}
//                 alt={property.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             <div className="flex space-x-2 overflow-x-auto">
//               {property.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
//                     selectedImage === index ? 'border-blue-600' : 'border-gray-200'
//                   }`}
//                 >
//                   <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Property Information */}
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
//                 <div className="flex items-center text-gray-600">
//                   <MapPin className="h-5 w-5 mr-2" />
//                   <span>{property.address}</span>
//                 </div>
//               </div>
              
//               <div className="flex space-x-2">
//                 <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <Heart className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                   <Share2 className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
//                 <div className="text-sm text-gray-600">Bedrooms</div>
//               </div>
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
//                 <div className="text-sm text-gray-600">Bathrooms</div>
//               </div>
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{property.squareFeet}</div>
//                 <div className="text-sm text-gray-600">Sq Ft</div>
//               </div>
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <div className="text-2xl font-bold text-gray-900">{property.yearBuilt}</div>
//                 <div className="text-sm text-gray-600">Built</div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
//               <p className="text-gray-700 leading-relaxed">{property.description}</p>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                 {property.amenities.map(amenity => (
//                   <div key={amenity} className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                     <span className="text-gray-700">{amenity}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Financial Performance */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Performance</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="p-3 bg-green-50 rounded-lg">
//                   <div className="text-lg font-bold text-green-700">
//                     ${property.financials.monthlyIncome.toLocaleString()}
//                   </div>
//                   <div className="text-sm text-green-600">Monthly Income</div>
//                 </div>
//                 <div className="p-3 bg-red-50 rounded-lg">
//                   <div className="text-lg font-bold text-red-700">
//                     ${property.financials.monthlyExpenses.toLocaleString()}
//                   </div>
//                   <div className="text-sm text-red-600">Monthly Expenses</div>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <div className="text-lg font-bold text-blue-700">
//                     ${property.financials.netMonthlyIncome.toLocaleString()}
//                   </div>
//                   <div className="text-sm text-blue-600">Net Monthly</div>
//                 </div>
//                 <div className="p-3 bg-purple-50 rounded-lg">
//                   <div className="text-lg font-bold text-purple-700">
//                     {property.financials.annualReturn}%
//                   </div>
//                   <div className="text-sm text-purple-600">Annual Return</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Investment Panel */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-600">Property Type</span>
//                 <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
//                   {property.propertyType}
//                 </span>
//               </div>
              
//               <div className="text-3xl font-bold text-gray-900 mb-1">
//                 ${property.pricePerShare.toLocaleString()}
//               </div>
//               <div className="text-sm text-gray-600">per share</div>
//             </div>

//             <div className="space-y-4 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Total Value:</span>
//                 <span className="font-semibold">${property.totalValue.toLocaleString()}</span>
//               </div>
              
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Available Shares:</span>
//                 <span className="font-semibold text-green-600">
//                   {property.availableShares}/{property.totalShares}
//                 </span>
//               </div>
              
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Monthly Rent:</span>
//                 <span className="font-semibold">${property.monthlyRent.toLocaleString()}</span>
//               </div>
//             </div>

//             {/* Share Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Number of Shares
//               </label>
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => setShareAmount(Math.max(1, shareAmount - 1))}
//                   className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={shareAmount}
//                   onChange={(e) => setShareAmount(Math.max(1, Math.min(property.availableShares, parseInt(e.target.value) || 1)))}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   min="1"
//                   max={property.availableShares}
//                 />
//                 <button
//                   onClick={() => setShareAmount(Math.min(property.availableShares, shareAmount + 1))}
//                   className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
//                 >
//                   +
//                 </button>
//               </div>
//               <div className="text-sm text-gray-600 mt-1">
//                 Max: {property.availableShares} shares
//               </div>
//             </div>

//             {/* Investment Summary */}
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-gray-600">Investment Amount:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   ${(shareAmount * property.pricePerShare).toLocaleString()}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-600">Monthly Income (est.):</span>
//                 <span className="font-semibold text-green-600">
//                   ${Math.round((shareAmount / property.totalShares) * property.financials.netMonthlyIncome).toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             {/* Investment Button */}
//             <button
//               onClick={handleInvest}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold"
//             >
//               Invest Now
//             </button>

//             <div className="text-xs text-gray-500 mt-3 text-center">
//               By investing, you agree to our terms and conditions
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;

  // import React, { useState, useEffect } from 'react';
  // import { useParams, Link } from 'react-router-dom';
  // import { 
  //   Building, 
  //   MapPin, 
  //   DollarSign, 
  //   Users, 
  //   Calendar, 
  //   ArrowLeft, 
  //   Share2, 
  //   Heart 
  // } from 'lucide-react';
  // import { useAuth } from '../../contexts/AuthProvider'; // ✅ make sure this is correct

  // const PropertyDetails = () => {
  //   const { callFunction } = useAuth(); // ✅ correct hook usage
  //   const { id } = useParams();
  //   const [property, setProperty] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [selectedImage, setSelectedImage] = useState(0);
  //   const [shareAmount, setShareAmount] = useState(1);

  //   // Helper: convert BigInt → Number and populate missing frontend fields
  //   const normalizeProperty = (prop) => ({
  //     id: Number(prop.id),
  //     title: prop.title,
  //     address: prop.address
  //       ? `${prop.address.street}, ${prop.address.city}, ${prop.address.state} ${Number(prop.address.zipcode)}`
  //       : "No address available",
  //     propertyType: prop.property_type,
  //     totalValue: Number(prop.total_value),
  //     availableShares: Number(prop.available_shares),
  //     totalShares: Number(prop.total_shares),
  //     pricePerShare: Number(prop.price_per_share),
  //     monthlyRent: Number(prop.monthly_rent),
  //     yearBuilt: Number(prop.year_built),
  //     squareFeet: Number(prop.square_feet),
  //     bedrooms: Number(prop.bedrooms),
  //     bathrooms: Number(prop.bathrooms),
  //     description: prop.description || "No description provided.",
  //     images: prop.images && prop.images.length > 0 
  //       ? prop.images 
  //       : ["/building.png", "/popular.png", "/residential.png"], // fallback
  //     amenities: prop.amenities && prop.amenities.length > 0 
  //       ? prop.amenities 
  //       : ["Parking", "Gym", "Security"],
  //     financials: {
  //       monthlyIncome: Number(prop.monthly_rent) || 0,
  //       monthlyExpenses: Number(prop.monthly_expenses) || 0,
  //       netMonthlyIncome: Number(prop.net_monthly_income) || 0,
  //       annualReturn: Number(prop.annual_return) || 0,
  //     },
  //     createdAt: prop.created_at || "N/A"
  //   });

  //   useEffect(() => {
  //     const fetchProperty = async () => {
  //       try {
  //         console.log("🔎 Fetching all properties from backend...");
  //         const allProps = await callFunction.get_all_properties(); // ✅ using callFunction
  //         console.log("✅ Raw properties from backend:", allProps);

  //         const found = allProps.find((p) => Number(p.id) === Number(id));
  //         console.log("👉 Found property with id", id, ":", found);

  //         if (found) {
  //           const normalized = normalizeProperty(found);
  //           console.log("✨ Normalized property:", normalized);
  //           setProperty(normalized);
  //         } else {
  //           setProperty(null);
  //         }
  //       } catch (err) {
  //         console.error("❌ Error fetching property:", err);
  //         setProperty(null);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchProperty();
  //   }, [id]);

  //   const handleInvest = () => {
  //     if (!property) return;
  //     const totalCost = shareAmount * property.pricePerShare;
  //     alert(`Investment of ${shareAmount} shares for $${totalCost.toLocaleString()} initiated!`);
  //   };

  //   if (loading) {
  //     return (
  //       <div className="max-w-7xl mx-auto p-6">
  //         <div className="animate-pulse">
  //           <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
  //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //             <div className="h-96 bg-gray-300 rounded-lg"></div>
  //             <div className="space-y-4">
  //               <div className="h-6 bg-gray-300 rounded w-3/4"></div>
  //               <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  //               <div className="h-20 bg-gray-300 rounded"></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (!property) {
  //     return (
  //       <div className="max-w-7xl mx-auto p-6 text-center">
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
  //         <Link to="/properties" className="text-blue-600 hover:text-blue-700">
  //           Back to Properties
  //         </Link>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="max-w-7xl mx-auto p-6">
  //       {/* Back Button */}
  //       <Link
  //         to="/properties"
  //         className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
  //       >
  //         <ArrowLeft className="h-5 w-5" />
  //         <span>Back to Properties</span>
  //       </Link>

  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //         {/* Images Section */}
  //         <div>
  //           <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
  //             <img
  //               src={property.images[selectedImage]}
  //               alt={property.title}
  //               className="w-full h-full object-cover"
  //             />
  //           </div>
  //           <div className="flex space-x-2 mt-4 overflow-x-auto">
  //             {property.images.map((img, index) => (
  //               <button
  //                 key={index}
  //                 onClick={() => setSelectedImage(index)}
  //                 className={`h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
  //                   selectedImage === index ? "border-blue-600" : "border-transparent"
  //                 }`}
  //               >
  //                 <img src={img} alt="" className="w-full h-full object-cover" />
  //               </button>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Details Section */}
  //         <div className="space-y-6">
  //           <div>
  //             <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
  //             <p className="text-gray-600 flex items-center mt-2">
  //               <MapPin className="h-5 w-5 mr-2" />
  //               {property.address}
  //             </p>
  //           </div>

  //           <div className="grid grid-cols-2 gap-4">
  //             <div className="flex items-center space-x-2">
  //               <Building className="h-5 w-5 text-gray-500" />
  //               <span>{property.propertyType}</span>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Calendar className="h-5 w-5 text-gray-500" />
  //               <span>Built in {property.yearBuilt}</span>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Users className="h-5 w-5 text-gray-500" />
  //               <span>{property.bedrooms} Beds · {property.bathrooms} Baths</span>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Share2 className="h-5 w-5 text-gray-500" />
  //               <span>{property.squareFeet} sq ft</span>
  //             </div>
  //           </div>

  //           <p className="text-gray-700">{property.description}</p>

  //           <div>
  //             <h3 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h3>
  //             <div className="flex flex-wrap gap-2">
  //               {property.amenities.map((amenity, idx) => (
  //                 <span
  //                   key={idx}
  //                   className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
  //                 >
  //                   {amenity}
  //                 </span>
  //               ))}
  //             </div>
  //           </div>

  //           <div className="bg-gray-50 p-4 rounded-lg space-y-2">
  //             <div className="flex justify-between">
  //               <span>Total Property Value</span>
  //               <span className="font-semibold">
  //                 ${property.totalValue.toLocaleString()}
  //               </span>
  //             </div>
  //             <div className="flex justify-between">
  //               <span>Price per Share</span>
  //               <span className="font-semibold">
  //                 ${property.pricePerShare.toLocaleString()}
  //               </span>
  //             </div>
  //             <div className="flex justify-between">
  //               <span>Available Shares</span>
  //               <span className="font-semibold">
  //                 {property.availableShares} / {property.totalShares}
  //               </span>
  //             </div>
  //           </div>

  //           <div className="flex space-x-4">
  //             <input
  //               type="number"
  //               min="1"
  //               max={property.availableShares}
  //               value={shareAmount}
  //               onChange={(e) => setShareAmount(Number(e.target.value))}
  //               className="w-24 p-2 border rounded-lg"
  //             />
  //             <button
  //               onClick={handleInvest}
  //               className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
  //             >
  //               Invest Now
  //             </button>
  //             <button className="p-2 border rounded-lg hover:bg-gray-50">
  //               <Heart className="h-5 w-5 text-gray-500" />
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Financial Overview */}
  //       <div className="mt-12">
  //         <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Overview</h2>
  //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  //           <div className="bg-white p-4 rounded-lg shadow">
  //             <div className="text-gray-500 text-sm">Monthly Income</div>
  //             <div className="text-lg font-semibold">
  //               ${property.financials.monthlyIncome.toLocaleString()}
  //             </div>
  //           </div>
  //           <div className="bg-white p-4 rounded-lg shadow">
  //             <div className="text-gray-500 text-sm">Monthly Expenses</div>
  //             <div className="text-lg font-semibold">
  //               ${property.financials.monthlyExpenses.toLocaleString()}
  //             </div>
  //           </div>
  //           <div className="bg-white p-4 rounded-lg shadow">
  //             <div className="text-gray-500 text-sm">Net Income</div>
  //             <div className="text-lg font-semibold">
  //               ${property.financials.netMonthlyIncome.toLocaleString()}
  //             </div>
  //           </div>
  //           <div className="bg-white p-4 rounded-lg shadow">
  //             <div className="text-gray-500 text-sm">Annual Return</div>
  //             <div className="text-lg font-semibold">
  //               {property.financials.annualReturn}%
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default PropertyDetails;


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

  const handleInvest = () => {
    if (!property) return;
    const totalCost = shareAmount * property.pricePerShare;
    alert(`Investment of ${shareAmount} shares for $${totalCost.toLocaleString()} initiated!`);
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
