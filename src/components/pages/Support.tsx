import React from 'react';
import { HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';

export function Support() {
  const faqs = [
    {
      question: "How do I find a builder?",
      answer: "Use our search filters to find builders by location, experience, and specialization. You can view their profiles, reviews, and past projects before making a decision."
    },
    {
      question: "Are the builders verified?",
      answer: "Yes, all builders undergo a verification process including license and GST verification. Look for the verified badge on builder profiles."
    },
    {
      question: "How do I contact a builder?",
      answer: "Once you're logged in, you can request a consultation or send a message directly through the builder's profile page."
    },
    {
      question: "What if I have issues with a builder?",
      answer: "Contact our support team immediately. We'll help mediate any concerns and ensure a fair resolution."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Support Center</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h2 className="font-semibold mb-2">Email Support</h2>
          <p className="text-gray-600">support@buildconnect.com</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h2 className="font-semibold mb-2">Phone Support</h2>
          <p className="text-gray-600">(555) 123-4567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h2 className="font-semibold mb-2">Live Chat</h2>
          <p className="text-gray-600">Available 9 AM - 6 PM</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <HelpCircle className="text-blue-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}