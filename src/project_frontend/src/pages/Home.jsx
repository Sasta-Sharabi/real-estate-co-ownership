import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Building,
      title: 'Premium Properties',
      description: 'Access high-quality residential and commercial properties vetted by our experts.'
    },
    {
      icon: Users,
      title: 'Co-ownership Made Simple',
      description: 'Own fractions of properties with other investors and share in the returns.'
    },
    {
      icon: TrendingUp,
      title: 'Passive Income',
      description: 'Earn monthly rental income from your property investments automatically.'
    },
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'All investments are secured with legal documentation and transparent reporting.'
    }
  ];

  const benefits = [
    'Lower barrier to entry - start with as little as $5,000',
    'Diversify across multiple properties and locations',
    'Professional property management included',
    'Liquid investment with secondary market trading',
    'Tax benefits of real estate ownership',
    'No maintenance or tenant management hassles'
  ];

  const stats = [
    { value: '$50M+', label: 'Total Properties' },
    { value: '2,500+', label: 'Active Investors' },
    { value: '8.5%', label: 'Average Annual Return' },
    { value: '150+', label: 'Properties Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Invest in Real Estate
                <span className="block text-blue-200">Together</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Own fractions of premium properties, earn passive income, and build wealth through 
                co-ownership with other investors. Start your real estate journey today.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/properties"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <span>Browse Properties</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/building.png"
                alt="Modern apartment building"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-blue-600">$2,850</div>
                <div className="text-sm text-gray-600">Monthly Income</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Co-ownership?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real estate co-ownership makes premium property investment accessible to everyone, 
              with professional management and transparent returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Benefits of Real Estate Co-ownership
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Traditional real estate investment requires significant capital and expertise. 
                Our co-ownership model removes these barriers while maintaining all the benefits.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/popular.png"
                alt="Commercial building"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -top-6 -right-6 bg-green-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">8.5%</div>
                <div className="text-sm">Avg. Annual Return</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with real estate co-ownership in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse Properties</h3>
              <p className="text-gray-600">
                Explore our curated selection of premium residential and commercial properties 
                available for co-ownership investment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Invest & Own</h3>
              <p className="text-gray-600">
                Purchase shares in properties that match your investment goals and risk tolerance. 
                Own a fraction, enjoy full benefits.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Earn Returns</h3>
              <p className="text-gray-600">
                Receive monthly rental income and benefit from property appreciation. 
                Track your portfolio performance in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Real Estate Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of investors who are building wealth through real estate co-ownership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/properties"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>View Properties</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;