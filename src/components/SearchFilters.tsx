import React from 'react';
import { Search, MapPin, Star, Clock } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: SearchFiltersType) => void;
}

export function SearchFiltersPanel({ filters, onFilterChange }: SearchFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.service}
            onChange={(e) => onFilterChange({ ...filters, service: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MapPin className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Star className="text-gray-400" size={20} />
          </div>
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            value={filters.rating}
            onChange={(e) => onFilterChange({ ...filters, rating: Number(e.target.value) })}
          >
            <option value={0}>Any Rating</option>
            <option value={3}>3+ Stars</option>
            <option value={3.5}>3.5+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={4.8}>4.8+ Stars</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Clock className="text-gray-400" size={20} />
          </div>
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            value={filters.experience}
            onChange={(e) => onFilterChange({ ...filters, experience: Number(e.target.value) })}
          >
            <option value={0}>Any Experience</option>
            <option value={2}>2+ Years</option>
            <option value={5}>5+ Years</option>
            <option value={8}>8+ Years</option>
            <option value={10}>10+ Years</option>
            <option value={15}>15+ Years</option>
            <option value={20}>20+ Years</option>
          </select>
        </div>
      </div>
    </div>
  );
}