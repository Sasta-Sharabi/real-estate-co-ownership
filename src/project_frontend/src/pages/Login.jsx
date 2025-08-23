import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { Building } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login();
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white items-center justify-center">
        <div className="p-12 text-center">
          <Building className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Welcome to Real Estate Co-Ownership</h1>
          <p className="text-lg">Invest in properties with transparency and ease.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-center text-3xl font-bold">Login</h2>
          <div className="mt-6 space-y-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login with Internet Identity"}
            </button>

            {error && (
              <p className="text-center text-red-500 text-sm mt-2">{error}</p>
            )}

            <p className="text-center text-sm">
              <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;




