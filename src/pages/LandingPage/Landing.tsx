import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-28 md:py-32 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Showcase Your Work,<br />Build Your Brand
          </h1>
          <p className={`text-lg sm:text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Create a stunning portfolio in minutes. Join thousands of developers, designers, 
            and creators showcasing their work to the world.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center px-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Free
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Explore Portfolios
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">Create your portfolio in minutes with our intuitive builder</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">Personalize every aspect to match your unique style</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Share Anywhere</h3>
              <p className="text-gray-600 leading-relaxed">Get a unique URL to share your work with the world</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Build Your Portfolio?</h2>
          <p className="text-lg sm:text-xl mb-8 text-blue-100 px-4">
            Join our community and start showcasing your work today!
          </p>
          <Link
            to="/register"
            className="inline-block w-full sm:w-auto px-8 py-4 mx-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
