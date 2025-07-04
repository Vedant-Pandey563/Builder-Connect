import React from 'react';
import { Building2, UserCircle2, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Fix My Location
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified builders and get your construction project started today. Choose how you'd like to proceed.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Builder Login */}
          <div 
            onClick={() => navigate('/builder-login')}
            className="bg-white rounded-xl shadow-lg p-8 text-center cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <Building2 className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Builder Login</h2>
            <p className="text-gray-600 mb-6">
              Access your builder dashboard and manage your projects
            </p>
            <button className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login as Builder <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* User Login */}
          <div 
            onClick={() => navigate('/user-login')}
            className="bg-white rounded-xl shadow-lg p-8 text-center cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <UserCircle2 className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">User Login</h2>
            <p className="text-gray-600 mb-6">
              Find and connect with builders for your project
            </p>
            <button className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login as User <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Guest Mode */}
          <div 
            onClick={() => navigate('/browse')}
            className="bg-white rounded-xl shadow-lg p-8 text-center cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <Users className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Guest Mode</h2>
            <p className="text-gray-600 mb-6">
              Browse builders without creating an account
            </p>
            <button className="flex items-center justify-center w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Browse as Guest <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fix My Location?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Verified Builders</h3>
              <p className="text-gray-600">All our builders are GST verified and thoroughly vetted</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Easy Connection</h3>
              <p className="text-gray-600">Direct communication with builders for your projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
              <p className="text-gray-600">Safe and secure platform for all your construction needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}