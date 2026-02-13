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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome, {user?.displayName}!
              </h1>
              <p className="text-gray-600 mt-1">Manage your portfolio and profile</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link
            to={`/portfolio/${user?.username}`}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">View Portfolio</h3>
            <p className="text-gray-600 text-sm">See how others see your portfolio</p>
          </Link>

          <Link
            to="/dashboard/edit"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center"
          >
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Portfolio</h3>
            <p className="text-gray-600 text-sm">Update your skills, projects, and info</p>
          </Link>

          <Link
            to="/explore"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Explore</h3>
            <p className="text-gray-600 text-sm">Discover other amazing portfolios</p>
          </Link>
        </div>

        {/* Portfolio Overview */}
        {portfolio && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Title</h3>
                <p className="text-gray-600">{portfolio.title}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tagline</h3>
                <p className="text-gray-600">{portfolio.tagline}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills</h3>
                <p className="text-gray-600">{portfolio.skills?.length || 0} skills added</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Projects</h3>
                <p className="text-gray-600">{portfolio.projects?.length || 0} projects showcased</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Visibility</h3>
                <p className="text-gray-600">{portfolio.isPublic ? 'Public' : 'Private'}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile URL</h3>
                <p className="text-blue-600 text-sm">
                  {window.location.origin}/portfolio/{user?.username}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
