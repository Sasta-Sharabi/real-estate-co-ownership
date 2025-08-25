// import React, { useState } from 'react';
// import { CreditCard, Calendar, DollarSign, Building, CheckCircle } from 'lucide-react';

// const PayRentForm = () => {
//   const [selectedLease, setSelectedLease] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [paymentAmount, setPaymentAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   // Mock lease data
//   const mockLeases = [
//     {
//       id: 1,
//       property: 'Modern Downtown Apartment',
//       address: '123 Main St, New York, NY',
//       monthlyRent: 3500,
//       dueDate: '2024-02-01',
//       status: 'due'
//     },
//     {
//       id: 2,
//       property: 'Commercial Office Space',
//       address: '456 Business Ave, Los Angeles, CA',
//       monthlyRent: 8500,
//       dueDate: '2024-02-05',
//       status: 'upcoming'
//     }
//   ];

//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     cardholderName: ''
//   });

//   const handleLeaseSelect = (leaseId) => {
//     const lease = mockLeases.find(l => l.id === parseInt(leaseId));
//     setSelectedLease(leaseId);
//     if (lease) {
//       setPaymentAmount(lease.monthlyRent.toString());
//     }
//   };

//   const handleCardInputChange = (e) => {
//     const { name, value } = e.target;
//     setCardDetails(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Simulate payment processing
//       await new Promise(resolve => setTimeout(resolve, 3000));
//       setPaymentSuccess(true);
      
//       // Reset form after success
//       setTimeout(() => {
//         setPaymentSuccess(false);
//         setSelectedLease('');
//         setPaymentAmount('');
//         setCardDetails({
//           cardNumber: '',
//           expiryDate: '',
//           cvv: '',
//           cardholderName: ''
//         });
//       }, 3000);
//     } catch (error) {
//       alert('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectedLeaseData = mockLeases.find(l => l.id === parseInt(selectedLease));

//   if (paymentSuccess) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//           <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
//           <p className="text-gray-600 mb-4">
//             Your rent payment of ${paymentAmount} has been processed successfully.
//           </p>
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//             <p className="text-sm text-green-700">
//               Payment confirmation will be sent to your email shortly.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-lg">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex items-center space-x-2">
//             <CreditCard className="h-6 w-6 text-blue-600" />
//             <h2 className="text-2xl font-bold text-gray-900">Pay Rent</h2>
//           </div>
//           <p className="text-gray-600 mt-1">Make a rent payment for your leased property</p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Lease Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Lease
//             </label>
//             <div className="space-y-3">
//               {mockLeases.map(lease => (
//                 <div
//                   key={lease.id}
//                   className={`border rounded-lg p-4 cursor-pointer transition-colors ${
//                     selectedLease === lease.id.toString()
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   onClick={() => handleLeaseSelect(lease.id.toString())}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <input
//                         type="radio"
//                         name="lease"
//                         value={lease.id}
//                         checked={selectedLease === lease.id.toString()}
//                         onChange={() => handleLeaseSelect(lease.id.toString())}
//                         className="text-blue-600 focus:ring-blue-500"
//                       />
//                       <div>
//                         <div className="flex items-center space-x-2">
//                           <Building className="h-4 w-4 text-gray-500" />
//                           <h3 className="font-medium text-gray-900">{lease.property}</h3>
//                         </div>
//                         <p className="text-sm text-gray-600">{lease.address}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-semibold text-gray-900">
//                         ${lease.monthlyRent.toLocaleString()}
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Calendar className="h-3 w-3 text-gray-400" />
//                         <span className="text-xs text-gray-500">Due: {lease.dueDate}</span>
//                       </div>
//                       <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
//                         lease.status === 'due' 
//                           ? 'bg-red-100 text-red-800' 
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {lease.status === 'due' ? 'Due Now' : 'Upcoming'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {selectedLeaseData && (
//             <>
//               {/* Payment Amount */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Payment Amount
//                 </label>
//                 <div className="relative">
//                   <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="number"
//                     value={paymentAmount}
//                     onChange={(e) => setPaymentAmount(e.target.value)}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="0.00"
//                     required
//                   />
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Monthly rent: ${selectedLeaseData.monthlyRent.toLocaleString()}
//                 </p>
//               </div>

//               {/* Payment Method */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Payment Method
//                 </label>
//                 <div className="space-y-3">
//                   <label className="flex items-center space-x-3 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="card"
//                       checked={paymentMethod === 'card'}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="text-blue-600 focus:ring-blue-500"
//                     />
//                     <CreditCard className="h-5 w-5 text-gray-500" />
//                     <span className="text-gray-700">Credit/Debit Card</span>
//                   </label>
//                   <label className="flex items-center space-x-3 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="bank"
//                       checked={paymentMethod === 'bank'}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="text-blue-600 focus:ring-blue-500"
//                     />
//                     <Building className="h-5 w-5 text-gray-500" />
//                     <span className="text-gray-700">Bank Transfer</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Card Details */}
//               {paymentMethod === 'card' && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-medium text-gray-900">Card Details</h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Cardholder Name
//                     </label>
//                     <input
//                       type="text"
//                       name="cardholderName"
//                       value={cardDetails.cardholderName}
//                       onChange={handleCardInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="John Doe"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Card Number
//                     </label>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       value={cardDetails.cardNumber}
//                       onChange={handleCardInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="1234 5678 9012 3456"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Expiry Date
//                       </label>
//                       <input
//                         type="text"
//                         name="expiryDate"
//                         value={cardDetails.expiryDate}
//                         onChange={handleCardInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="MM/YY"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         CVV
//                       </label>
//                       <input
//                         type="text"
//                         name="cvv"
//                         value={cardDetails.cvv}
//                         onChange={handleCardInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="123"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Bank Transfer Info */}
//               {paymentMethod === 'bank' && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <h3 className="text-lg font-medium text-blue-900 mb-2">Bank Transfer Details</h3>
//                   <div className="space-y-1 text-sm text-blue-700">
//                     <p><strong>Account Name:</strong> RealEstate Co-own</p>
//                     <p><strong>Account Number:</strong> 1234567890</p>
//                     <p><strong>Routing Number:</strong> 021000021</p>
//                     <p><strong>Reference:</strong> Lease #{selectedLeaseData.id}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Payment Summary */}
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Summary</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Property:</span>
//                     <span className="font-medium">{selectedLeaseData.property}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Payment Amount:</span>
//                     <span className="font-medium">${parseFloat(paymentAmount || 0).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Processing Fee:</span>
//                     <span className="font-medium">$0.00</span>
//                   </div>
//                   <div className="border-t border-gray-200 pt-2">
//                     <div className="flex justify-between">
//                       <span className="text-lg font-semibold text-gray-900">Total:</span>
//                       <span className="text-lg font-semibold text-gray-900">
//                         ${parseFloat(paymentAmount || 0).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-6 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   disabled={loading || !paymentAmount}
//                   className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
//                 >
//                   {loading ? 'Processing Payment...' : `Pay $${parseFloat(paymentAmount || 0).toLocaleString()}`}
//                 </button>
//               </div>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PayRentForm;

import React from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';

const PayRentForm = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <CreditCard className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pay Rent</h2>
        <p className="text-gray-600 mb-6">
          This feature has not been built yet.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-sm text-yellow-700">
              The rent payment system is currently under development.
              Please check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRentForm;
