import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import {
  Building,
  FileText,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { isAuth, login, callFunction } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboard = async () => {
    if (!callFunction) return;
    try {
      const data = await callFunction.get_user_data();
      console.log("Fetched dashboard data:", data);

      const mappedData = {
        totalInvestment: Number(data.total_investment),
        currentValue: Number(data.current_value),
        monthlyIncome: Number(data.monthly_income),
        totalReturn: Number(data.total_return),
      };

      setDashboardData(mappedData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Unable to load dashboard data.");
    }
  };

  // Fetch user registered properties
  const fetchProperties = async () => {
    if (!callFunction) return;
    try {
      const backendProps = await callFunction.get_user_registered_properties();
      console.log("Fetched user properties:", backendProps);

      const mappedProps = backendProps.map(p => ({
        id: Number(p.id),
        title: p.title,
        location: `${p.address.street}, ${p.address.city}`,
        monthlyIncome: p.monthly_rent ? Number(p.monthly_rent) : 0,
        image: p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/64"
      }));

      setProperties(mappedProps);
    } catch (err) {
      console.error("Error fetching user properties:", err);
      setProperties([]);
    }
  };

  // Poll both dashboard + properties every 3s
  useEffect(() => {
    fetchDashboard();
    fetchProperties();
    const interval = setInterval(() => {
      fetchDashboard();
      fetchProperties();
    }, 3000);
    return () => clearInterval(interval);
  }, [callFunction]);

  if (!isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Real Estate Co-Ownership</h1>
        <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Investor!</h1>
        <p className="text-gray-600">Here's an overview of your real estate portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total Investment" value={dashboardData?.totalInvestment ?? 0} icon={DollarSign} color="text-blue-600" />
        <SummaryCard title="Current Value" value={dashboardData?.currentValue ?? 0} icon={Building} color="text-green-600" />
        <SummaryCard title="Monthly Income" value={dashboardData?.monthlyIncome ?? 0} icon={Calendar} color="text-purple-600" />
        <SummaryCard title="Total Return" value={`+${dashboardData?.totalReturn ?? 0}%`} icon={TrendingUp} color="text-green-600" isPercentage />
      </div>

      <QuickActions />
      <MyProperties data={properties} />
    </div>
  );
};

// =================== Helper Components ===================

const SummaryCard = ({ title, value, icon: Icon, color, isPercentage }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className={`text-2xl font-bold ${isPercentage ? color : 'text-gray-900'}`}>
          {isPercentage ? value : `$${Number(value).toLocaleString()}`}
        </p>
      </div>
      <Icon className={`h-8 w-8 ${color}`} />
    </div>
  </div>
);

const QuickActions = () => {
  const actions = [
    { title: 'Browse Properties', description: 'Find new investment opportunities', icon: Building, link: '/properties', color: 'bg-blue-500' },
    { title: 'Register Property', description: 'List a new property for co-ownership', icon: Plus, link: '/properties/register', color: 'bg-green-500' },
    { title: 'Create Lease', description: 'Register a new lease agreement', icon: FileText, link: '/leases/register', color: 'bg-purple-500' },
    { title: 'Pay Rent', description: 'Make a rent payment', icon: DollarSign, link: '/rent/pay', color: 'bg-orange-500' }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link key={index} to={action.link} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className={`${action.color} p-3 rounded-lg`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const MyProperties = ({ data }) => (
  <div className="bg-white rounded-lg shadow-md">
    <SectionHeader title="My Properties" linkText="View All" linkTo="/portfolio" />
    <div className="p-6 space-y-4">
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No properties found.</p>
      ) : (
        data.map(property => (
          <div key={property.id} className="flex items-center space-x-4">
            <img src={property.image} alt={property.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>
              {/* Shares removed */}
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">${property.monthlyIncome}/mo</p>
              <Link to={`/properties/${property.id}`} className="text-blue-600 hover:text-blue-700 text-sm">
                <Eye className="h-4 w-4 inline" />
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const SectionHeader = ({ title, linkText, linkTo }) => (
  <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    {linkText && linkTo && (
      <Link to={linkTo} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
        {linkText}
      </Link>
    )}
  </div>
);

export default Dashboard;
