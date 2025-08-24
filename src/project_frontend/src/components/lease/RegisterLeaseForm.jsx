import React, { useState, useEffect } from 'react';
import { FileText, User, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthProvider';

const RegisterLeaseForm = () => {
  const { callFunction } = useAuth(); 
  const [formData, setFormData] = useState({
    propertyId: '',
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    leaseStartDate: '',
    leaseEndDate: '',
    monthlyRent: '',
    securityDeposit: '',
    leaseTerms: '',
    specialConditions: ''
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all properties but exclude user-registered ones
  useEffect(() => {
    const fetchAvailableProperties = async () => {
      if (!callFunction) return;

      try {
        const allProps = await callFunction.get_all_properties();
        const userProps = await callFunction.get_user_registered_properties();

        const userPropIds = userProps.map(p => Number(p.id));
        const availableProps = allProps
          .filter(p => !userPropIds.includes(Number(p.id)))
          .map(p => ({
            id: Number(p.id),
            title: p.title,
            address: p.address ? `${p.address.street}, ${p.address.city}` : 'No address'
          }));

        setProperties(availableProps);
      } catch (err) {
        console.error('Error fetching available properties:', err);
        setProperties([]);
      }
    };

    fetchAvailableProperties();
  }, [callFunction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (callFunction?.register_lease) {
        // Call backend with ordered params (not object!)
        await callFunction.register_lease(
          Number(formData.propertyId),
          formData.tenantName,
          formData.tenantEmail,
          formData.tenantPhone,
          formData.leaseStartDate,
          formData.leaseEndDate,
          Number(formData.monthlyRent),
          Number(formData.securityDeposit),
          formData.leaseTerms,
          formData.specialConditions
        );
        alert('Lease registered successfully!');
      }

      // reset form
      setFormData({
        propertyId: '',
        tenantName: '',
        tenantEmail: '',
        tenantPhone: '',
        leaseStartDate: '',
        leaseEndDate: '',
        monthlyRent: '',
        securityDeposit: '',
        leaseTerms: '',
        specialConditions: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error registering lease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateLeaseDuration = () => {
    if (formData.leaseStartDate && formData.leaseEndDate) {
      const start = new Date(formData.leaseStartDate);
      const end = new Date(formData.leaseEndDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    }
    return 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Register New Lease</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Property Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Property
            </label>
            <select
              name="propertyId"
              value={formData.propertyId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a property...</option>
              {properties.length === 0 && <option disabled>No available properties</option>}
              {properties.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} - {p.address}
                </option>
              ))}
            </select>
          </div>

          {/* Tenant Information, Lease Terms, Financial Terms, Lease Conditions ... remain the same */}
          {/* Tenant Information */}
             <div className="space-y-4">
               <div className="flex items-center space-x-2 mb-2">
                 <User className="h-5 w-5 text-gray-500" />
                 <h3 className="text-lg font-medium text-gray-900">Tenant Information</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Tenant Name
                  </label>
                   <input
                  type="text"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tenant's full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="tenantEmail"
                  value={formData.tenantEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tenant@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="tenantPhone"
                value={formData.tenantPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          {/* Lease Terms */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Lease Terms</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lease Start Date
                </label>
                <input
                  type="date"
                  name="leaseStartDate"
                  value={formData.leaseStartDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lease End Date
                </label>
                <input
                  type="date"
                  name="leaseEndDate"
                  value={formData.leaseEndDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {calculateLeaseDuration() > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  Lease Duration: <span className="font-semibold">{calculateLeaseDuration()} months</span>
                </p>
              </div>
            )}
          </div>

          {/* Financial Terms */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Financial Terms</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="3500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Deposit ($)
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7000"
                  required
                />
              </div>
            </div>

            {formData.monthlyRent && calculateLeaseDuration() > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700">
                  Total Lease Value: <span className="font-semibold">
                    ${(parseFloat(formData.monthlyRent) * calculateLeaseDuration()).toLocaleString()}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Lease Terms & Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lease Terms & Conditions
            </label>
            <textarea
              name="leaseTerms"
              value={formData.leaseTerms}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Standard lease terms and conditions..."
              required
            />
          </div>

          {/* Special Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Conditions (Optional)
            </label>
            <textarea
              name="specialConditions"
              value={formData.specialConditions}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special conditions or clauses..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating Lease...' : 'Create Lease Agreement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterLeaseForm;
