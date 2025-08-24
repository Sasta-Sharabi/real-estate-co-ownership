// import React, { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, DollarSign, Building, Calendar, PieChart } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthProvider';

// const Portfolio = () => {
//   const { isAuth, login, principal, callFunction } = useAuth();
//   const [portfolioData, setPortfolioData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedPeriod, setSelectedPeriod] = useState('12m');
//   const [error, setError] = useState(null);

//   // === Fallback Mock Data ===
//   const mockPortfolioData = {
//     totalInvestment: 0,
//     currentValue: 0,
//     totalReturn: 0,
//     returnPercentage: 0,
//     monthlyIncome: 0,
//     properties: [],
//     monthlyData: [],
//   };

//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       if (!isAuth || !principal) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const data = await callFunction.get_user_data();
//         if (data) {
//           setPortfolioData({
//             totalInvestment: Number(data.total_investment || 0),
//             currentValue: Number(data.current_value || 0),
//             totalReturn: Number(data.total_return || 0),
//             returnPercentage: data.total_investment
//               ? ((Number(data.total_return) / Number(data.total_investment)) * 100).toFixed(2)
//               : 0,
//             monthlyIncome: Number(data.monthly_income || 0),

//             // Only fill what backend provides
//             properties: (data.user_invested_properties || []).map((p, idx) => ({
//               id: Number(p.property_id || idx),
//               title: `Property #${p.property_id}`,
//               address: "",
//               shares: Number(p.shares_owned || 0),
//               totalShares: 0,
//               investment: 0,
//               currentValue: 0,
//               monthlyIncome: 0,
//               returnPercentage: 0,
//               image: "/placeholder.jpg",
//             })),

//             monthlyData: [],
//           });
//         } else {
//           setPortfolioData(mockPortfolioData);
//         }
//       } catch (err) {
//         console.error("Failed to fetch portfolio:", err);
//         setError("Unable to load portfolio data.");
//         setPortfolioData(mockPortfolioData);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPortfolio();
//   }, [isAuth, principal, callFunction]);

//   // === Show login screen if not authenticated ===
//   if (!isAuth) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">My Portfolio</h1>
//         <p className="text-gray-600 mb-6">Please log in to view your portfolio.</p>
//         <button
//           onClick={login}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </div>
//     );
//   }

//   if (!portfolioData) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 text-red-600">
//         {error || "No portfolio data available."}
//       </div>
//     );
//   }

//   const getReturnColor = (percentage) => {
//     return percentage >= 0 ? 'text-green-600' : 'text-red-600';
//   };

//   const getReturnIcon = (percentage) => {
//     return percentage >= 0 ? TrendingUp : TrendingDown;
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
//           <p className="text-gray-600">Track your real estate investments and returns</p>
//         </div>
        
//         <div className="mt-4 md:mt-0">
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="1m">Last Month</option>
//             <option value="3m">Last 3 Months</option>
//             <option value="6m">Last 6 Months</option>
//             <option value="12m">Last 12 Months</option>
//           </select>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Investment</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${portfolioData.totalInvestment.toLocaleString()}
//               </p>
//             </div>
//             <DollarSign className="h-8 w-8 text-blue-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Current Value</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${portfolioData.currentValue.toLocaleString()}
//               </p>
//             </div>
//             <Building className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Return</p>
//               <p className={`text-2xl font-bold ${getReturnColor(portfolioData.returnPercentage)}`}>
//                 ${portfolioData.totalReturn.toLocaleString()}
//               </p>
//               <p className={`text-sm ${getReturnColor(portfolioData.returnPercentage)} flex items-center`}>
//                 {React.createElement(getReturnIcon(portfolioData.returnPercentage), { className: "h-4 w-4 mr-1" })}
//                 {portfolioData.returnPercentage}%
//               </p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${portfolioData.monthlyIncome.toLocaleString()}
//               </p>
//             </div>
//             <Calendar className="h-8 w-8 text-purple-600" />
//           </div>
//         </div>
//       </div>

//       {/* Performance Chart */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
//           <PieChart className="h-6 w-6 text-gray-500" />
//         </div>
        
//         <p className="text-gray-500">No performance data available yet.</p>
//       </div>

//       {/* Property Holdings */}
//       <div className="bg-white rounded-lg shadow-md">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">Property Holdings</h2>
//         </div>
        
//         <div className="p-6">
//           <div className="space-y-6">
//             {portfolioData.properties.map(property => (
//               <div key={property.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
//                   {/* Property Image */}
//                   <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Property Details */}
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
//                     <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                    
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                       <div>
//                         <span className="text-gray-600">Shares:</span>
//                         <span className="font-medium ml-1">
//                           {property.shares}/{property.totalShares}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600">Investment:</span>
//                         <span className="font-medium ml-1">
//                           ${property.investment.toLocaleString()}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600">Current Value:</span>
//                         <span className="font-medium ml-1">
//                           ${property.currentValue.toLocaleString()}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600">Monthly Income:</span>
//                         <span className="font-medium ml-1">
//                           ${property.monthlyIncome.toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Performance */}
//                   <div className="text-right">
//                     <div className={`text-lg font-bold ${getReturnColor(property.returnPercentage)}`}>
//                       +{property.returnPercentage}%
//                     </div>
//                     <div className="text-sm text-gray-600">Return</div>
//                     <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{ width: `${(property.shares / (property.totalShares || 1)) * 100}%` }}
//                       ></div>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {((property.shares / (property.totalShares || 1)) * 100).toFixed(1)}% owned
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {portfolioData.properties.length === 0 && (
//               <p className="text-gray-500">No properties found.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* My Leases Section */}
//       <div className="bg-white rounded-lg shadow-md mt-8">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">My Leases</h2>
//         </div>

//         <div className="p-6">
//           {/* Replace this with actual leases from backend when available */}
//           {portfolioData.leases && portfolioData.leases.length > 0 ? (
//             <div className="space-y-6">
//               {portfolioData.leases.map(lease => (
//                 <div key={lease.lease_id} className="border border-gray-200 rounded-lg p-4">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     Lease #{lease.lease_id} — Property #{lease.property_id}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-1">
//                     <strong>Tenant:</strong> {lease.tenant_name || "N/A"}
//                   </p>
//                   <p className="text-sm text-gray-600 mb-1">
//                     <strong>Lease Start:</strong> {lease.lease_start_date || "N/A"}
//                   </p>
//                   <p className="text-sm text-gray-600 mb-1">
//                     <strong>Lease End:</strong> {lease.lease_end_date || "N/A"}
//                   </p>
//                   <p className="text-sm text-gray-600 mb-1">
//                     <strong>Monthly Rent:</strong> ${lease.monthly_rent || 0}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <strong>Status:</strong> {lease.status || "N/A"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No active leases found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;


// import React, { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, DollarSign, Building, Calendar, PieChart } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthProvider';

// const Portfolio = () => {
//   const { isAuth, login, principal, callFunction } = useAuth();
//   const [portfolioData, setPortfolioData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedPeriod, setSelectedPeriod] = useState('12m');
//   const [error, setError] = useState(null);

//   // === Fallback Mock Data ===
//   const mockPortfolioData = {
//     totalInvestment: 0,
//     currentValue: 0,
//     totalReturn: 0,
//     returnPercentage: 0,
//     monthlyIncome: 0,
//     properties: [],
//     leases: [],
//     monthlyData: [],
//   };

//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       // If user is not authenticated or principal is missing, stop fetching
//       if (!isAuth || !principal) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // Call backend function to get user data
//         const data = await callFunction.get_user_data();

//         if (data) {
//           // Transform backend data into frontend-friendly structure
//           setPortfolioData({
//             totalInvestment: Number(data.total_investment || 0),
//             currentValue: Number(data.current_value || 0),
//             totalReturn: Number(data.total_return || 0),
//             returnPercentage: data.total_investment
//               ? ((Number(data.total_return) / Number(data.total_investment)) * 100).toFixed(2)
//               : 0,
//             monthlyIncome: Number(data.monthly_income || 0),

//             // Map invested properties from backend to frontend format
//             properties: (data.user_invested_properties || []).map((p, idx) => ({
//               id: Number(p.property_id || idx),
//               title: `Property #${p.property_id}`,
//               address: p.address || "",
//               shares: Number(p.shares_owned || 0),
//               totalShares: Number(p.total_shares || 0),
//               investment: Number(p.investment || 0),
//               currentValue: Number(p.current_value || 0),
//               monthlyIncome: Number(p.monthly_income || 0),
//               returnPercentage: Number(p.return_percentage || 0),
//               image: p.image || "/placeholder.jpg",
//             })),

//             // Map leases from backend to frontend format
//             leases: (data.user_leases || []).map(l => ({
//               lease_id: Number(l.lease_id),
//               property_id: Number(l.property_id),
//               tenant_name: l.tenant_name,
//               lease_start_date: l.lease_start_date,
//               lease_end_date: l.lease_end_date,
//               monthly_rent: Number(l.monthly_rent || 0),
//               status: l.status || "N/A",
//             })),

//             // Placeholder for future monthly data (e.g., chart)
//             monthlyData: [],
//           });
//         } else {
//           // If backend returned null or undefined, use mock data
//           setPortfolioData(mockPortfolioData);
//         }
//       } catch (err) {
//         // Log any error that occurs while fetching
//         console.error("Failed to fetch portfolio:", err);
//         setError("Unable to load portfolio data.");
//         setPortfolioData(mockPortfolioData);
//       } finally {
//         // Stop loading state regardless of success/failure
//         setLoading(false);
//       }
//     };

//     fetchPortfolio();
//   }, [isAuth, principal, callFunction]); // Re-run fetch if auth or callFunction changes


//   if (!isAuth) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">My Portfolio</h1>
//         <p className="text-gray-600 mb-6">Please log in to view your portfolio.</p>
//         <button
//           onClick={login}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </div>
//     );
//   }

//   if (!portfolioData) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 text-red-600">
//         {error || "No portfolio data available."}
//       </div>
//     );
//   }

//   const getReturnColor = (percentage) => percentage >= 0 ? 'text-green-600' : 'text-red-600';
//   const getReturnIcon = (percentage) => percentage >= 0 ? TrendingUp : TrendingDown;

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
//           <p className="text-gray-600">Track your real estate investments and returns</p>
//         </div>
//         <div className="mt-4 md:mt-0">
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="1m">Last Month</option>
//             <option value="3m">Last 3 Months</option>
//             <option value="6m">Last 6 Months</option>
//             <option value="12m">Last 12 Months</option>
//           </select>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Investment</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${portfolioData.totalInvestment.toLocaleString()}
//               </p>
//             </div>
//             <DollarSign className="h-8 w-8 text-blue-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Current Value</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${portfolioData.currentValue.toLocaleString()}
//               </p>
//             </div>
//             <Building className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Return</p>
//               <p className={`text-2xl font-bold ${getReturnColor(portfolioData.returnPercentage)}`}>
//                 ${portfolioData.totalReturn.toLocaleString()}
//               </p>
//               <p className={`text-sm ${getReturnColor(portfolioData.returnPercentage)} flex items-center`}>
//                 {React.createElement(getReturnIcon(portfolioData.returnPercentage), { className: "h-4 w-4 mr-1" })}
//                 {portfolioData.returnPercentage}%
//               </p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${portfolioData.monthlyIncome.toLocaleString()}
//               </p>
//             </div>
//             <Calendar className="h-8 w-8 text-purple-600" />
//           </div>
//         </div>
//       </div>

//       {/* Performance Chart */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
//           <PieChart className="h-6 w-6 text-gray-500" />
//         </div>
//         <p className="text-gray-500">No performance data available yet.</p>
//       </div>

//       {/* My Properties */}
//       <div className="bg-white rounded-lg shadow-md mb-8">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
//         </div>
//         <div className="p-6 space-y-6">
//           {portfolioData.properties.length > 0 ? (
//             portfolioData.properties.map(property => (
//               <div key={property.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
//                 <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                   <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
//                   <p className="text-sm text-gray-600 mb-2">{property.address}</p>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                     <div><span className="text-gray-600">Shares:</span> <span className="font-medium ml-1">{property.shares}/{property.totalShares}</span></div>
//                     <div><span className="text-gray-600">Investment:</span> <span className="font-medium ml-1">${property.investment.toLocaleString()}</span></div>
//                     <div><span className="text-gray-600">Current Value:</span> <span className="font-medium ml-1">${property.currentValue.toLocaleString()}</span></div>
//                     <div><span className="text-gray-600">Monthly Income:</span> <span className="font-medium ml-1">${property.monthlyIncome.toLocaleString()}</span></div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className={`text-lg font-bold ${getReturnColor(property.returnPercentage)}`}>+{property.returnPercentage}%</div>
//                   <div className="text-sm text-gray-600">Return</div>
//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                     <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(property.shares / (property.totalShares || 1)) * 100}%` }}></div>
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">{((property.shares / (property.totalShares || 1)) * 100).toFixed(1)}% owned</div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No properties found.</p>
//           )}
//         </div>
//       </div>

//       {/* My Leases */}
//       <div className="bg-white rounded-lg shadow-md mb-8">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">My Leases</h2>
//         </div>
//         <div className="p-6 space-y-6">
//           {portfolioData.leases.length > 0 ? (
//             portfolioData.leases.map(lease => (
//               <div key={lease.lease_id} className="border border-gray-200 rounded-lg p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Lease #{lease.lease_id} — Property #{lease.property_id}</h3>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Tenant:</strong> {lease.tenant_name}</p>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Lease Start:</strong> {lease.lease_start_date}</p>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Lease End:</strong> {lease.lease_end_date}</p>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Monthly Rent:</strong> ${lease.monthly_rent}</p>
//                 <p className="text-sm text-gray-600"><strong>Status:</strong> {lease.status}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No active leases found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;


// import React, { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, DollarSign, Building, Calendar, PieChart } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthProvider';

// const Portfolio = () => {
//   const { isAuth, login, principal, callFunction } = useAuth();

//   // Separate states for top summary, properties, and leases
//   const [summaryData, setSummaryData] = useState({
//     totalInvestment: 0,
//     currentValue: 0,
//     totalReturn: 0,
//     returnPercentage: 0,
//     monthlyIncome: 0,
//   });
//   const [properties, setProperties] = useState([]);
//   const [leases, setLeases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPeriod, setSelectedPeriod] = useState('12m');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       if (!isAuth || !principal) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // 1️⃣ Fetch top summary data
//         const data = await callFunction.get_user_data();
//         if (data) {
//           setSummaryData({
//             totalInvestment: Number(data.total_investment || 0),
//             currentValue: Number(data.current_value || 0),
//             totalReturn: Number(data.total_return || 0),
//             returnPercentage: data.total_investment
//               ? ((Number(data.total_return) / Number(data.total_investment)) * 100).toFixed(2)
//               : 0,
//             monthlyIncome: Number(data.monthly_income || 0),
//           });
//         }

//         // 2️⃣ Fetch properties
//         const propsData = await callFunction.get_user_registered_properties();
//         const mappedProperties = (propsData || []).map((p, idx) => ({
//           id: Number(p.property_id || idx),
//           title: p.title || `Property #${p.property_id}`,
//           address: p.address || "",
//           shares: Number(p.shares_owned || 0),
//           totalShares: Number(p.total_shares || 0),
//           investment: Number(p.investment || 0),
//           currentValue: Number(p.current_value || 0),
//           monthlyIncome: Number(p.monthly_income || 0),
//           returnPercentage: Number(p.return_percentage || 0),
//           image: p.image || "/placeholder.jpg",
//         }));
//         setProperties(mappedProperties);

//         // 3️⃣ Fetch leases
//         const leasesData = await callFunction.get_my_leases();
//         const mappedLeases = (leasesData || []).map(l => ({
//           lease_id: Number(l.lease_id),
//           property_id: Number(l.property_id),
//           tenant_name: l.tenant_name,
//           lease_start_date: l.lease_start_date,
//           lease_end_date: l.lease_end_date,
//           monthly_rent: Number(l.monthly_rent || 0),
//           status: l.status || "N/A",
//         }));
//         setLeases(mappedLeases);

//       } catch (err) {
//         console.error("Failed to fetch portfolio:", err);
//         setError("Unable to load portfolio data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPortfolio();
//   }, [isAuth, principal, callFunction]);

//   if (!isAuth) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">My Portfolio</h1>
//         <p className="text-gray-600 mb-6">Please log in to view your portfolio.</p>
//         <button
//           onClick={login}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="max-w-7xl mx-auto p-6 text-gray-500">Loading portfolio...</div>;
//   }

//   const getReturnColor = (percentage) => percentage >= 0 ? 'text-green-600' : 'text-red-600';
//   const getReturnIcon = (percentage) => percentage >= 0 ? TrendingUp : TrendingDown;

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
//           <p className="text-gray-600">Track your real estate investments and returns</p>
//         </div>
//         <div className="mt-4 md:mt-0">
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="1m">Last Month</option>
//             <option value="3m">Last 3 Months</option>
//             <option value="6m">Last 6 Months</option>
//             <option value="12m">Last 12 Months</option>
//           </select>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Investment</p>
//               <p className="text-2xl font-bold text-gray-900">${summaryData.totalInvestment.toLocaleString()}</p>
//             </div>
//             <DollarSign className="h-8 w-8 text-blue-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Current Value</p>
//               <p className="text-2xl font-bold text-gray-900">${summaryData.currentValue.toLocaleString()}</p>
//             </div>
//             <Building className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Return</p>
//               <p className={`text-2xl font-bold ${getReturnColor(summaryData.returnPercentage)}`}>${summaryData.totalReturn.toLocaleString()}</p>
//               <p className={`text-sm ${getReturnColor(summaryData.returnPercentage)} flex items-center`}>
//                 {React.createElement(getReturnIcon(summaryData.returnPercentage), { className: "h-4 w-4 mr-1" })}
//                 {summaryData.returnPercentage}%
//               </p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
//               <p className="text-2xl font-bold text-gray-900">${summaryData.monthlyIncome.toLocaleString()}</p>
//             </div>
//             <Calendar className="h-8 w-8 text-purple-600" />
//           </div>
//         </div>
//       </div>

//       {/* Properties and Leases sections remain the same as before */}
//       {/* Use `properties` and `leases` states */}
      
//     </div>
//   );
// };

// export default Portfolio;


// import React, { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, DollarSign, Building, Calendar, PieChart } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthProvider';

// const Portfolio = () => {
//   const { isAuth, login, principal, callFunction } = useAuth();

//   // === State hooks ===
//   const [summaryData, setSummaryData] = useState({
//     totalInvestment: 0,
//     currentValue: 0,
//     totalReturn: 0,
//     returnPercentage: 0,
//     monthlyIncome: 0,
//   });
//   const [properties, setProperties] = useState([]);
//   const [leases, setLeases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPeriod, setSelectedPeriod] = useState('12m');
//   const [error, setError] = useState(null);

//   // === Fetch backend data ===
//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       if (!isAuth || !principal) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // 1️⃣ Top summary data
//         const data = await callFunction.get_user_data();
//         if (data) {
//           setSummaryData({
//             totalInvestment: Number(data.total_investment || 0),
//             currentValue: Number(data.current_value || 0),
//             totalReturn: Number(data.total_return || 0),
//             returnPercentage: data.total_investment
//               ? ((Number(data.total_return) / Number(data.total_investment)) * 100).toFixed(2)
//               : 0,
//             monthlyIncome: Number(data.monthly_income || 0),
//           });
//         }

//         // 2️⃣ Properties
//         const propsData = await callFunction.get_user_registered_properties();
//         console.log(propsData);
//         const mappedProperties = (propsData || []).map((p, idx) => ({
//           id: Number(p.id ?? idx),
//           title: p.title ?? `Property #${p.id}`,
//           address: p.address
//             ? `${p.address.street}, ${p.address.city}, ${p.address.state}, ${Number(p.address.zipcode)}`
//             : "",
//           shares: Number(p.financial_details?.available_shares ?? 0n),
//           totalShares: Number(p.financial_details?.available_shares ?? 0n),
//           investment: Number(p.financial_details?.price_per_share ?? 0n) * Number(p.financial_details?.available_shares ?? 0n),
//           currentValue: Number(p.financial_details?.total_property_value ?? 0n),
//           monthlyIncome: Number(p.monthly_rent ?? 0n),
//           returnPercentage: 0,
//           image: (p.images && p.images[0]) || "/placeholder.jpg",
//           propertyType: p.property_type ? Object.keys(p.property_type)[0] : "N/A",
//           description: p.property_description ?? "",
//         }));
//         setProperties(mappedProperties);

//         // 3️⃣ Leases
//         const leasesData = await callFunction.get_my_leases();
//         console.log(leasesData);
//         const mappedLeases = (leasesData || []).map(l => ({
//           lease_id: Number(l.lease_id),
//           property_id: Number(l.property_id),
//           tenant_name: l.tenant_name,
//           tenant_email: l.tenant_email,
//           tenant_phone: l.tenant_phone,
//           lease_start_date: l.lease_start_date,
//           lease_end_date: l.lease_end_date,
//           monthly_rent: Number(l.monthly_rent ?? 0n),
//           security_deposit: Number(l.security_deposit ?? 0n),
//           lease_terms: l.lease_terms ?? "",
//           special_conditions: l.special_conditions ?? "",
//           status: l.status ? Object.keys(l.status)[0] : "N/A", // extract key from {Active: null}
//         }));
//         setLeases(mappedLeases);

//       } catch (err) {
//         console.error("Failed to fetch portfolio:", err);
//         setError("Unable to load portfolio data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPortfolio();
//   }, [isAuth, principal, callFunction]);

//   if (!isAuth) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">My Portfolio</h1>
//         <p className="text-gray-600 mb-6">Please log in to view your portfolio.</p>
//         <button
//           onClick={login}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="max-w-7xl mx-auto p-6 text-gray-500">Loading portfolio...</div>;
//   }

//   const getReturnColor = (percentage) => percentage >= 0 ? 'text-green-600' : 'text-red-600';
//   const getReturnIcon = (percentage) => percentage >= 0 ? TrendingUp : TrendingDown;

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
//           <p className="text-gray-600">Track your real estate investments and returns</p>
//         </div>
//         <div className="mt-4 md:mt-0">
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="1m">Last Month</option>
//             <option value="3m">Last 3 Months</option>
//             <option value="6m">Last 6 Months</option>
//             <option value="12m">Last 12 Months</option>
//           </select>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Investment</p>
//               <p className="text-2xl font-bold text-gray-900">${summaryData.totalInvestment.toLocaleString()}</p>
//             </div>
//             <DollarSign className="h-8 w-8 text-blue-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Current Value</p>
//               <p className="text-2xl font-bold text-gray-900">${summaryData.currentValue.toLocaleString()}</p>
//             </div>
//             <Building className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Return</p>
//               <p className={`text-2xl font-bold ${getReturnColor(summaryData.returnPercentage)}`}>${summaryData.totalReturn.toLocaleString()}</p>
//               <p className={`text-sm ${getReturnColor(summaryData.returnPercentage)} flex items-center`}>
//                 {React.createElement(getReturnIcon(summaryData.returnPercentage), { className: "h-4 w-4 mr-1" })}
//                 {summaryData.returnPercentage}%
//               </p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-green-600" />
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
//               <p className="text-2xl font-bold text-gray-900">${summaryData.monthlyIncome.toLocaleString()}</p>
//             </div>
//             <Calendar className="h-8 w-8 text-purple-600" />
//           </div>
//         </div>
//       </div>

//       {/* Performance Chart */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
//           <PieChart className="h-6 w-6 text-gray-500" />
//         </div>
//         <p className="text-gray-500">No performance data available yet.</p>
//       </div>

//       {/* My Properties */}
//       <div className="bg-white rounded-lg shadow-md mb-8">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
//         </div>
//         <div className="p-6 space-y-6">
//           {properties.length > 0 ? (
//             properties.map(property => (
//               <div key={property.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
//                 <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                   <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
//                   <p className="text-sm text-gray-600 mb-2">{property.address}</p>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                     <div><span className="text-gray-600">Shares:</span> <span className="font-medium ml-1">{property.shares}/{property.totalShares}</span></div>
//                     <div><span className="text-gray-600">Investment:</span> <span className="font-medium ml-1">${property.investment.toLocaleString()}</span></div>
//                     <div><span className="text-gray-600">Current Value:</span> <span className="font-medium ml-1">${property.currentValue.toLocaleString()}</span></div>
//                     <div><span className="text-gray-600">Monthly Income:</span> <span className="font-medium ml-1">${property.monthlyIncome.toLocaleString()}</span></div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className={`text-lg font-bold ${getReturnColor(property.returnPercentage)}`}>+{property.returnPercentage}%</div>
//                   <div className="text-sm text-gray-600">Return</div>
//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                     <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(property.shares / (property.totalShares || 1)) * 100}%` }}></div>
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">{((property.shares / (property.totalShares || 1)) * 100).toFixed(1)}% owned</div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No properties found.</p>
//           )}
//         </div>
//       </div>

//       {/* My Leases */}
//       <div className="bg-white rounded-lg shadow-md mb-8">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">My Leases</h2>
//         </div>
//         <div className="p-6 space-y-6">
//           {leases.length > 0 ? (
//             leases.map(lease => (
//               <div key={lease.lease_id} className="border border-gray-200 rounded-lg p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Lease #{lease.lease_id} — Property #{lease.property_id}</h3>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Tenant:</strong> {lease.tenant_name}</p>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Lease Start:</strong> {lease.lease_start_date}</p>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Lease End:</strong> {lease.lease_end_date}</p>
//                 <p className="text-sm text-gray-600 mb-1"><strong>Monthly Rent:</strong> ${lease.monthly_rent}</p>
//                 <p className="text-sm text-gray-600"><strong>Status:</strong> {lease.status}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No active leases found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Building, Calendar, PieChart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthProvider';

const Portfolio = () => {
  const { isAuth, login, principal, callFunction } = useAuth();

  const [summaryData, setSummaryData] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalReturn: 0,
    returnPercentage: 0,
    monthlyIncome: 0,
  });
  const [properties, setProperties] = useState([]);
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('12m');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!isAuth || !principal) {
        setLoading(false);
        return;
      }

      try {
        // 1️⃣ Summary Data
        const data = await callFunction.get_user_data();
        if (data) {
          setSummaryData({
            totalInvestment: Number(data.total_investment || 0),
            currentValue: Number(data.current_value || 0),
            totalReturn: Number(data.total_return || 0),
            returnPercentage: data.total_investment
              ? ((Number(data.total_return) / Number(data.total_investment)) * 100).toFixed(2)
              : 0,
            monthlyIncome: Number(data.monthly_income || 0),
          });
        }

        // 2️⃣ User-invested properties
        const investedData = await callFunction.get_user_invested_properties();
        console.log(investedData);

        const mappedProperties = (investedData || []).map((inv, idx) => {
          const p = inv.property;
          return {
            id: Number(p.id ?? idx),
            title: p.title ?? `Property #${p.id}`,
            address: p.address
              ? `${p.address.street}, ${p.address.city}, ${p.address.state}, ${Number(p.address.zipcode)}`
              : "",
            shares: Number(inv.shares_owned ?? 0),
            totalShares: Number(p.financial_details?.available_shares ?? 0n) + Number(inv.shares_owned ?? 0),
            investment: Number(p.financial_details?.price_per_share ?? 0n) * Number(inv.shares_owned ?? 0),
            currentValue: Number(p.financial_details?.total_property_value ?? 0n),
            monthlyIncome: Number(p.monthly_rent ?? 0n),
            returnPercentage: 0,
            image: (p.images && p.images[0]) || "/placeholder.jpg",
            propertyType: p.property_type ? Object.keys(p.property_type)[0] : "N/A",
            description: p.property_description ?? "",
          };
        });
        setProperties(mappedProperties);

        // 3️⃣ Leases
        const leasesData = await callFunction.get_my_leases();
        console.log(leasesData);
        const mappedLeases = (leasesData || []).map(l => ({
          lease_id: Number(l.lease_id),
          property_id: Number(l.property_id),
          tenant_name: l.tenant_name,
          tenant_email: l.tenant_email,
          tenant_phone: l.tenant_phone,
          lease_start_date: l.lease_start_date,
          lease_end_date: l.lease_end_date,
          monthly_rent: Number(l.monthly_rent ?? 0n),
          security_deposit: Number(l.security_deposit ?? 0n),
          lease_terms: l.lease_terms ?? "",
          special_conditions: l.special_conditions ?? "",
          status: l.status ? Object.keys(l.status)[0] : "N/A",
        }));
        setLeases(mappedLeases);

      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
        setError("Unable to load portfolio data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [isAuth, principal, callFunction]);

  if (!isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">My Portfolio</h1>
        <p className="text-gray-600 mb-6">Please log in to view your portfolio.</p>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto p-6 text-gray-500">Loading portfolio...</div>;
  }

  const getReturnColor = (percentage) => percentage >= 0 ? 'text-green-600' : 'text-red-600';
  const getReturnIcon = (percentage) => percentage >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
          <p className="text-gray-600">Track your real estate investments and returns</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Investment</p>
              <p className="text-2xl font-bold text-gray-900">${summaryData.totalInvestment.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">${summaryData.currentValue.toLocaleString()}</p>
            </div>
            <Building className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Return</p>
              <p className={`text-2xl font-bold ${getReturnColor(summaryData.returnPercentage)}`}>${summaryData.totalReturn.toLocaleString()}</p>
              <p className={`text-sm ${getReturnColor(summaryData.returnPercentage)} flex items-center`}>
                {React.createElement(getReturnIcon(summaryData.returnPercentage), { className: "h-4 w-4 mr-1" })}
                {summaryData.returnPercentage}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
              <p className="text-2xl font-bold text-gray-900">${summaryData.monthlyIncome.toLocaleString()}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
          <PieChart className="h-6 w-6 text-gray-500" />
        </div>
        <p className="text-gray-500">No performance data available yet.</p>
      </div>

      {/* My Investments */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Investments</h2>
        </div>
        <div className="p-6 space-y-6">
          {properties.length > 0 ? (
            properties.map(property => (
              <div key={property.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="text-gray-600">Shares:</span> <span className="font-medium ml-1">{property.shares}/{property.totalShares}</span></div>
                    <div><span className="text-gray-600">Investment:</span> <span className="font-medium ml-1">${property.investment.toLocaleString()}</span></div>
                    <div><span className="text-gray-600">Current Value:</span> <span className="font-medium ml-1">${property.currentValue.toLocaleString()}</span></div>
                    <div><span className="text-gray-600">Monthly Income:</span> <span className="font-medium ml-1">${property.monthlyIncome.toLocaleString()}</span></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getReturnColor(property.returnPercentage)}`}>+{property.returnPercentage}%</div>
                  <div className="text-sm text-gray-600">Return</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(property.shares / (property.totalShares || 1)) * 100}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{((property.shares / (property.totalShares || 1)) * 100).toFixed(1)}% owned</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No investments found.</p>
          )}
        </div>
      </div>

      {/* My Leases */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Leases</h2>
        </div>
        <div className="p-6 space-y-6">
          {leases.length > 0 ? (
            leases.map(lease => (
              <div key={lease.lease_id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lease #{lease.lease_id} — Property #{lease.property_id}</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Tenant:</strong> {lease.tenant_name}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Lease Start:</strong> {lease.lease_start_date}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Lease End:</strong> {lease.lease_end_date}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Monthly Rent:</strong> ${lease.monthly_rent}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {lease.status}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No active leases found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
