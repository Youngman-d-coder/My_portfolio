import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioService, Portfolio } from '../../services/portfolioService';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This portfolio does not exist or is private.'}</p>
          <Link to="/explore" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Explore Portfolios
          </Link>
        </div>
      </div>
    );
  }

  const primaryColor = portfolio.theme?.primaryColor || '#1e40af';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            {portfolio.user?.avatar ? (
              <img 
                src={portfolio.user.avatar} 
                alt={portfolio.user.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-6xl font-bold" style={{ color: primaryColor }}>
                {portfolio.user?.displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {portfolio.user?.displayName}
          </h1>
          <p className="text-xl md:text-2xl mb-2">{portfolio.tagline}</p>
          {portfolio.user?.bio && (
            <p className="text-lg opacity-90 mt-4 max-w-2xl mx-auto">{portfolio.user.bio}</p>
          )}
          
          {/* Social Links */}
          {portfolio.socialLinks && (
            <div className="flex justify-center gap-4 mt-6">
              {portfolio.socialLinks.github && (
                <a 
                  href={portfolio.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {portfolio.socialLinks.linkedin && (
                <a 
                  href={portfolio.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {portfolio.socialLinks.twitter && (
                <a 
                  href={portfolio.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About</h2>
            <p className="text-gray-700 text-lg whitespace-pre-wrap">{portfolio.about}</p>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.skills.map((skill, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="font-semibold text-gray-800">{skill.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
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
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        View Project →
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
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Experience</h2>
            <div className="space-y-6">
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {portfolio.contact && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              {portfolio.contact.email && (
                <a 
                  href={`mailto:${portfolio.contact.email}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Email Me
                </a>
              )}
              {portfolio.contact.website && (
                <a 
                  href={portfolio.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-800 text-white text-center">
        <p>© {new Date().getFullYear()} {portfolio.user?.displayName}. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">
          Built with <Link to="/" className="text-blue-400 hover:text-blue-300">Portfolio Platform</Link>
        </p>
      </footer>
    </div>
  );
};

export default UserPortfolio;
