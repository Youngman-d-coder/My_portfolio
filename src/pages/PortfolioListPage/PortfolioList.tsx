import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { portfolioService, Portfolio } from '../../services/portfolioService';
import SkeletonLoader from '../../components/SkeletonLoader';
import AuthNavbar from '../../components/AuthNavbar';

const PortfolioList: React.FC = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPortfolios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getAllPortfolios(search, page);
      setPortfolios(data.portfolios);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPortfolios();
  };

  return (
    <>
      {user && <AuthNavbar />}
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 sm:py-12 px-4 ${user ? 'pt-24' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-opacity-10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-blue-200">
            ✨ Discover Amazing Work
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Explore Portfolios
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing work from talented creators around the world
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8 sm:mb-12 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or username..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none shadow-sm bg-white hover:shadow-md"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </span>
            </button>
          </div>
        </form>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <SkeletonLoader type="card" count={6} />
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <svg className="w-32 h-32 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 text-xl font-semibold mb-2">No portfolios found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {portfolios.map((portfolio) => (
              <Link
                key={portfolio._id}
                to={`/portfolio/${portfolio.user?.username}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.03] border-2 border-transparent hover:border-blue-200"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center mb-5">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {portfolio.user?.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                        {portfolio.user?.displayName}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">@{portfolio.user?.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium mb-4 line-clamp-2 min-h-[3rem]">{portfolio.tagline || 'No tagline set'}</p>
                  {portfolio.user?.bio && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">{portfolio.user.bio}</p>
                  )}
                  {portfolio.skills && portfolio.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {portfolio.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {portfolio.skills.length > 3 && (
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border border-gray-200">
                          +{portfolio.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex items-center">
                    View Portfolio
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="group w-full sm:w-auto px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-800 transition-all duration-200"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>
            <div className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg">
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="group w-full sm:w-auto px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-800 transition-all duration-200"
            >
              <span className="flex items-center justify-center">
                Next
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default PortfolioList;
