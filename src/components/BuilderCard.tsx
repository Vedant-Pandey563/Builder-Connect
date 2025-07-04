import React from 'react';
import { Star, MapPin, Award, Building2, Clock4 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Builder } from '../types';

interface BuilderCardProps {
  builder: Builder;
  isLoggedIn: boolean;
  onConnect: (builder: Builder) => void;
}

export function BuilderCard({ builder, isLoggedIn }: BuilderCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate(`/builder/${builder.builder_id}`);
    } else {
      navigate('/user-login');
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'established':
        return { color: 'bg-green-500', text: 'Established Builder (5+ years)' };
      case 'beginner':
        return { color: 'bg-blue-500', text: 'Growing Builder (2-3 years)' };
      case 'newcomer':
        return { color: 'bg-purple-500', text: 'New Builder' };
      default:
        return { color: 'bg-gray-500', text: 'Unspecified' };
    }
  };

  const categoryBadge = getCategoryBadge(builder.category);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={builder.builder_image} 
          alt={builder.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          {builder.is_gst_verified && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
              <Award size={16} />
              <span className="text-sm">GST Verified</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{builder.name}</h3>
            <p className="text-gray-600">License: {isLoggedIn ? builder.license_no : '****'}</p>
          </div>
          {builder.rating && (
            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
              <Star className="text-yellow-500" size={16} fill="currentColor" />
              <span className="font-medium">{builder.rating.toFixed(1)}</span>
              {builder.total_reviews && (
                <span className="text-sm text-gray-500">({builder.total_reviews})</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span>{isLoggedIn ? builder.address : 'Login to view full address'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 size={18} />
            <span>Projects Completed: {builder.projects_completed}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock4 size={18} />
            <span>{builder.experience} experience</span>
          </div>
          <div className={`${categoryBadge.color} text-white px-3 py-1 rounded-full text-sm inline-flex items-center gap-2`}>
            <Award size={16} />
            <span>{categoryBadge.text}</span>
          </div>
        </div>

        <div className="mt-6">
          {isLoggedIn ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/builder/${builder.builder_id}`);
              }}
              className="w-full py-2 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              View Details
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/user-login');
              }}
              className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              Login to View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}