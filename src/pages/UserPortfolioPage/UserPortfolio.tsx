import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioService, Portfolio } from '../../services/portfolioService';
import SkeletonLoader from '../../components/SkeletonLoader';

const UserPortfolio: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      fetchPortfolio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getPortfolio(username!);
      setPortfolio(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Portfolio not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <SkeletonLoader type="avatar" count={1} />
            <div className="mt-8 space-y-4 max-w-xl mx-auto">
              <SkeletonLoader type="text" count={1} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            <SkeletonLoader type="stat" count={4} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center max-w-md">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'This portfolio does not exist or is private.'}</p>
          <Link to="/explore" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Explore Portfolios
          </Link>
        </div>
      </div>
    );
  }

  const primaryColor = portfolio.theme?.primaryColor || '#1e40af';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section 
        className="relative py-20 sm:py-24 md:py-28 px-4 text-white shadow-2xl overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-32 h-32 sm:w-36 sm:h-36 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 border-4 border-white border-opacity-50">
            {portfolio.user?.avatar ? (
              <img 
                src={portfolio.user.avatar} 
                alt={portfolio.user.displayName}
                className="w-full h-full rounded-3xl object-cover"
              />
            ) : (
              <span className="text-6xl sm:text-7xl font-bold" style={{ color: primaryColor }}>
                {portfolio.user?.displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 animate-fade-in">
            {portfolio.user?.displayName}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-3 font-semibold">{portfolio.tagline}</p>
          {portfolio.user?.bio && (
            <p className="text-base sm:text-lg md:text-xl opacity-95 mt-6 max-w-3xl mx-auto leading-relaxed px-4">{portfolio.user.bio}</p>
          )}
          
          {/* Social Links */}
          {portfolio.socialLinks && (
            <div className="flex justify-center gap-4 mt-10">
              {portfolio.socialLinks.github && (
                <a 
                  href={portfolio.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm"
                  aria-label="GitHub"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {portfolio.socialLinks.linkedin && (
                <a 
                  href={portfolio.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm"
                  aria-label="LinkedIn"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {portfolio.socialLinks.twitter && (
                <a 
                  href={portfolio.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm"
                  aria-label="Twitter"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      {portfolio.about && (
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
              About
            </h2>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-700 text-base sm:text-lg whitespace-pre-wrap leading-relaxed">{portfolio.about}</p>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="py-16 sm:py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 flex items-center justify-center sm:justify-start">
              <span className="w-2 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4"></span>
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {portfolio.skills.map((skill, index) => (
                <div key={index} className="group p-5 sm:p-6 border-2 border-gray-200 rounded-2xl text-center bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <p className="font-bold text-gray-800 text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">{skill.name}</p>
                  <p className="text-xs sm:text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full inline-block">{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 flex items-center justify-center sm:justify-start">
              <span className="w-2 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4"></span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {portfolio.projects.map((project, index) => (
                <div key={index} className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.03]">
                  <div className="p-7 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex-1">{project.title}</h3>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center ml-3 group-hover:scale-110 transition-transform shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-5 text-sm sm:text-base leading-relaxed">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-md hover:shadow-lg"
                      >
                        View Project 
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience && portfolio.experience.length > 0 && (
        <section className="py-12 sm:py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
              Experience
            </h2>
            <div className="space-y-6">
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6 py-2 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg hover:from-blue-100 transition-colors duration-300">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-700 font-semibold mt-1">{exp.company}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 mt-3 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {portfolio.contact && (
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8 text-base sm:text-lg">Interested in working together? Let's connect!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {portfolio.contact.email && (
                <a 
                  href={`mailto:${portfolio.contact.email}`}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Me
                  </span>
                </a>
              )}
              {portfolio.contact.website && (
                <a 
                  href={portfolio.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Visit Website
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 text-white text-center">
        <p className="text-sm sm:text-base">© {new Date().getFullYear()} {portfolio.user?.displayName}. All rights reserved.</p>
        <p className="mt-3 text-sm text-gray-400">
          Built with <Link to="/" className="text-blue-400 hover:text-blue-300 underline transition-colors">Portfolio Platform</Link>
        </p>
      </footer>
    </div>
  );
};

export default UserPortfolio;
