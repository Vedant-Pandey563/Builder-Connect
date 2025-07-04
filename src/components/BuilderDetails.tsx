import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Clock, 
  BadgeCheck,
  ChevronLeft,
  Calendar
} from 'lucide-react';
import { Builder, User } from '../types';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface BuilderDetailsProps {
  builders: Builder[];
  user: User | null;
}

interface ConsultationFormData {
  date: string;
  time: string;
  projectDetails: string;
  projectType: string;
  budget: string;
}

export function BuilderDetails({ builders, user }: BuilderDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    date: '',
    time: '',
    projectDetails: '',
    projectType: 'residential',
    budget: ''
  });
  
  if (!user) {
    navigate('/user-login');
    return null;
  }

  const builder = builders.find(b => b.builder_id === Number(id));
  
  if (!builder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Builder not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the consultation request
      const { error: requestError } = await supabase
        .from('requests')
        .insert([
          {
            client_id: user.user_id,
            builder_id: builder.builder_id,
            project_type: formData.projectType,
            budget_range: formData.budget,
            request_details: formData.projectDetails,
            consultation_date: `${formData.date}T${formData.time}`,
            status: 'pending'
          }
        ]);

      if (requestError) throw requestError;

      toast.success('Consultation request sent successfully!');
      setIsBookingModalOpen(false);
      setFormData({
        date: '',
        time: '',
        projectDetails: '',
        projectType: 'residential',
        budget: ''
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to book consultation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Builders</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img 
              src={builder.builder_image} 
              alt={builder.name}
              className="w-full h-full object-cover"
            />
            {builder.verified && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                <BadgeCheck size={20} />
                <span>Verified Builder</span>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{builder.name}</h1>
                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <MapPin size={20} />
                  <span>{builder.address}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <Star className="text-yellow-500" size={20} fill="currentColor" />
                  <span className="font-semibold">{builder.rating}</span>
                  <span className="text-gray-600">({builder.total_reviews} reviews)</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-gray-600">
                  <Clock size={16} />
                  <span>{builder.experience} experience</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="text-blue-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium">{builder.contact_info.phone || 'Contact via email'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="text-blue-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">{builder.contact_info.email}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Building2 className="text-blue-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600">GST Number</div>
                  <div className="font-medium">{builder.gst_number}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Building2 className="text-blue-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                  <div className="font-medium">{builder.projects_completed}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < 4 ? "text-yellow-500" : "text-gray-300"}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-gray-600">4.0</span>
              </div>
              <p className="mt-2 text-gray-700">
                "Great service and professional team. They completed the project on time and within budget."
              </p>
              <div className="mt-2 text-sm text-gray-600">
                - John Doe, 2 months ago
              </div>
            </div>
          </div>
        </div>
      </main>

      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Consultation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="residential">Residential Construction</option>
                  <option value="commercial">Commercial Construction</option>
                  <option value="renovation">Renovation</option>
                  <option value="interior">Interior Work</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Budget Range</option>
                  <option value="0-25L">Under ₹25 Lakhs</option>
                  <option value="25-50L">₹25-50 Lakhs</option>
                  <option value="50L-1Cr">₹50 Lakhs - 1 Crore</option>
                  <option value="1Cr+">Above ₹1 Crore</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Details
                </label>
                <textarea
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe your project requirements..."
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}