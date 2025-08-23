import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PropertyList from './components/property/PropertyList';
import PropertyDetails from './components/property/PropertyDetails';
import RegisterPropertyForm from './components/property/RegisterPropertyForm';
import RegisterLeaseForm from './components/lease/RegisterLeaseForm';
import PayRentForm from './components/rent/PayRentForm';
import Portfolio from './components/portfolio/Portfolio';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/properties/register" element={<RegisterPropertyForm />} />
            <Route path="/leases" element={<RegisterLeaseForm />} />
            <Route path="/leases/register" element={<RegisterLeaseForm />} />
            <Route path="/rent/pay" element={<PayRentForm />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;