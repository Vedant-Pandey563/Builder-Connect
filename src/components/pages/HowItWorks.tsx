import React from 'react';
import { CheckCircle, PenTool as Tool, Clock, Star } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Tool className="w-12 h-12 text-blue-600" />,
      title: "Find the Right Builder",
      description: "Browse through our verified builders, filter by experience, location, and specialization to find the perfect match for your project."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
      title: "Verify Credentials",
      description: "Check builder profiles, GST verification, licenses, and past project reviews to ensure quality and reliability."
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Request Consultation",
      description: "Schedule a consultation with your chosen builder to discuss project requirements and get a quote."
    },
    {
      icon: <Star className="w-12 h-12 text-blue-600" />,
      title: "Start Your Project",
      description: "Begin your construction project with confidence, knowing you're working with verified professionals."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">How BuildConnect Works</h1>
      
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">{step.icon}</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}