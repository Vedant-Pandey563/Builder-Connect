import React from 'react';
import { Building2, Shield, Users, TrendingUp } from 'lucide-react';

export function BecomeBuilder() {
  const benefits = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Expand Your Reach",
      description: "Connect with potential clients actively looking for construction services."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Build Trust",
      description: "Get verified status and showcase your credentials to establish credibility."
    },
    {
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
      title: "Showcase Projects",
      description: "Display your portfolio and collect reviews from satisfied clients."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: "Grow Your Business",
      description: "Access tools and features designed to help your construction business thrive."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Become a Builder on BuildConnect</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">{benefit.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{benefit.title}</h2>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Ready to Join?</h2>
        <p className="text-gray-700 mb-6">
          Join our network of professional builders and start growing your business today.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
          Apply as Builder
        </button>
      </div>
    </div>
  );
}