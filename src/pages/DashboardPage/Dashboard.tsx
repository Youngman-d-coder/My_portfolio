import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { portfolioService, Portfolio } from '../../services/portfolioService';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPortfolio();
  }, [user, navigate]);

  const fetchPortfolio = async () => {
    try {
      const data = await portfolioService.getMyPortfolio();
      setPortfolio(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 transform hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                Welcome back, {user?.displayName}! 👋
              </h1>
              <p className="text-gray-600">Manage your portfolio and profile</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <Link
            to={`/portfolio/${user?.username}`}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group transform hover:scale-105"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">View Portfolio</h3>
            <p className="text-gray-600 text-sm">See how others see your portfolio</p>
          </Link>

          <Link
            to="/dashboard/edit"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group transform hover:scale-105"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">Edit Portfolio</h3>
            <p className="text-gray-600 text-sm">Update your skills, projects, and info</p>
          </Link>

          <Link
            to="/explore"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group transform hover:scale-105 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">Explore</h3>
            <p className="text-gray-600 text-sm">Discover other amazing portfolios</p>
          </Link>
        </div>

        {/* Portfolio Overview */}
        {portfolio && (
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transform hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
              Portfolio Overview
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">Title</h3>
                <p className="text-gray-800 font-semibold">{portfolio.title || 'Not set'}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">Tagline</h3>
                <p className="text-gray-800 font-semibold">{portfolio.tagline || 'Not set'}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                <h3 className="text-sm font-medium text-blue-600 mb-1 uppercase tracking-wide">Skills</h3>
                <p className="text-2xl font-bold text-blue-700">{portfolio.skills?.length || 0}</p>
                <p className="text-sm text-blue-600 mt-1">skills added</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                <h3 className="text-sm font-medium text-green-600 mb-1 uppercase tracking-wide">Projects</h3>
                <p className="text-2xl font-bold text-green-700">{portfolio.projects?.length || 0}</p>
                <p className="text-sm text-green-600 mt-1">projects showcased</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                <h3 className="text-sm font-medium text-purple-600 mb-1 uppercase tracking-wide">Visibility</h3>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${portfolio.isPublic ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <p className="text-gray-800 font-semibold">{portfolio.isPublic ? 'Public' : 'Private'}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">Profile URL</h3>
                <a 
                  href={`${window.location.origin}/portfolio/${user?.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium break-all underline"
                >
                  View portfolio →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
