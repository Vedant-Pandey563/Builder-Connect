import React, { useState } from 'react';
import { Building2, Users, Star, Briefcase, ChevronRight, Bell, MessageCircle, Settings, FileText, Calendar, Upload, Edit2, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BuilderDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Rest of the BuilderDashboard component code remains the same, just add margin-top to the sidebar
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - Added mt-16 for spacing below header */}
      <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Builder Dashboard</h1>
        </div>
        {/* Rest of the sidebar content */}
      </div>

      {/* Main Content - Added mt-16 for spacing below header */}
      <div className="ml-64 p-8 mt-16">
        {renderContent()}
      </div>
    </div>
  );
}