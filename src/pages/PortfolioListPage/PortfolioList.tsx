import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioService, Portfolio } from '../../services/portfolioService';

const PortfolioList: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
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
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none shadow-sm"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </form>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading portfolios...</p>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-lg font-medium">No portfolios found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {portfolios.map((portfolio) => (
              <Link
                key={portfolio._id}
                to={`/portfolio/${portfolio.user?.username}`}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:scale-[1.02]"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {portfolio.user?.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                        {portfolio.user?.displayName}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">@{portfolio.user?.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium mb-3 line-clamp-2 min-h-[3rem]">{portfolio.tagline || 'No tagline set'}</p>
                  {portfolio.user?.bio && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{portfolio.user.bio}</p>
                  )}
                  {portfolio.skills && portfolio.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {portfolio.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100 group-hover:bg-blue-100 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {portfolio.skills.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                          +{portfolio.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border-2 border-gray-200 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>
            <div className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-md">
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border-2 border-gray-200 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="flex items-center justify-center">
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
