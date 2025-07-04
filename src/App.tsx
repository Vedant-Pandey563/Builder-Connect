import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Building, Home } from 'lucide-react';
import { Builder, SearchFilters, User } from './types';
import { BuilderCard } from './components/BuilderCard';
import { SearchFiltersPanel } from './components/SearchFilters';
import { LoginModal } from './components/LoginModal';
import { BuilderDetails } from './components/BuilderDetails';
import { HowItWorks } from './components/pages/HowItWorks';
import { BecomeBuilder } from './components/pages/BecomeBuilder';
import { Support } from './components/pages/Support';
import { BuilderLogin } from './components/pages/BuilderLogin';
import { UserLogin } from './components/pages/UserLogin';
import { BuilderDashboard } from './components/pages/BuilderDashboard';
import { LandingPage } from './components/LandingPage';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BUILDERS } from './data/builders';

interface BrowsePageProps {
  user: User | null;
}

function BrowsePage({ user }: BrowsePageProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    service: '',
    rating: 0,
    experience: 0,
    category: undefined
  });

  const filteredBuilders = BUILDERS.filter(builder => {
    if (filters.location && !builder.address.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.service && !builder.specializations?.some(s => s.toLowerCase().includes(filters.service.toLowerCase()))) {
      return false;
    }
    if (filters.rating > 0 && (!builder.rating || builder.rating < filters.rating)) {
      return false;
    }
    if (filters.experience > 0) {
      const yearsExp = parseInt(builder.experience);
      if (isNaN(yearsExp) || yearsExp < filters.experience) {
        return false;
      }
    }
    if (filters.category && builder.category !== filters.category) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Fix My Location
        </h1>
        <p className="text-xl text-gray-600">
          Connect with verified builders and get your project started today
        </p>
      </div>

      <div className="mb-8">
        <SearchFiltersPanel 
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBuilders.map((builder) => (
          <BuilderCard
            key={builder.builder_id}
            builder={builder}
            isLoggedIn={!!user}
            onConnect={() => {}}
          />
        ))}
      </div>

      {filteredBuilders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No builders found matching your criteria.</p>
        </div>
      )}
    </>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLandingPage && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="text-blue-600" size={32} />
                </Link>
                <Link to="/browse" className="flex items-center gap-2">
                  <Building className="text-blue-600" size={32} />
                  <h1 className="text-2xl font-bold text-gray-900">Fix My Location</h1>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/builder-login" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
                  Builder Login
                </Link>
                <button 
                  onClick={() => user ? setUser(null) : setIsLoginModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  {user ? 'Logout' : 'Login / Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={`${!isLandingPage ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<BrowsePage user={user} />} />
          <Route path="/builder/:id" element={<BuilderDetails builders={BUILDERS} user={user} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/become-builder" element={<BecomeBuilder />} />
          <Route path="/support" element={<Support />} />
          <Route path="/builder-login" element={<BuilderLogin />} />
          <Route path="/user-login" element={<UserLogin setUser={setUser} />} />
          <Route path="/builder-dashboard" element={<BuilderDashboard />} />
        </Routes>
      </main>

      {!isLandingPage && (
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Fix My Location</h3>
                <p className="text-gray-400">
                  Connecting quality builders with clients for successful construction projects.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link to="/browse" className="hover:text-white">Find Builders</Link>
                  </li>
                  <li>
                    <Link to="/how-it-works" className="hover:text-white">How it Works</Link>
                  </li>
                  <li>
                    <Link to="/become-builder" className="hover:text-white">Become a Builder</Link>
                  </li>
                  <li>
                    <Link to="/support" className="hover:text-white">Support</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: support@fixmylocation.com</li>
                  <li>Phone: (555) 123-4567</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={setUser}
      />
    </div>
  );
}

export default App;