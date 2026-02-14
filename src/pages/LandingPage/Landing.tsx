import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-28 md:py-32 text-white">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`inline-block px-6 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white border-opacity-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            ✨ Join 10,000+ creators worldwide
          </div>
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Showcase Your Work,<br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Build Your Brand
            </span>
          </h1>
          <p className={`text-lg sm:text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Create a stunning portfolio in minutes. Join thousands of developers, designers, 
            and creators showcasing their work to the world.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center px-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/register"
              className="group w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started Free
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              to="/explore"
              className="group w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-xl backdrop-blur-sm bg-white bg-opacity-10 hover:bg-opacity-20 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                Explore Portfolios
                <svg className="w-5 h-5 ml-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Placeholder values for demonstration */}
      <section className="px-4 sm:px-6 py-12 bg-white bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Portfolios Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">100K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Projects Showcased</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600 text-sm sm:text-base">Satisfaction Rate</div>
            </div>
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

      {/* How It Works Section */}
      <section className="px-4 sm:px-6 py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Building your professional portfolio has never been easier
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Sign Up Free</h3>
              <p className="text-gray-600 leading-relaxed">Create your account in seconds. No credit card required.</p>
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 -z-10"></div>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Build Your Portfolio</h3>
              <p className="text-gray-600 leading-relaxed">Add your projects, skills, and experience with our easy-to-use builder.</p>
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-green-300 -z-10"></div>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Share & Shine</h3>
              <p className="text-gray-600 leading-relaxed">Get your unique URL and share your portfolio with the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 py-20 md:py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Portfolio?</h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-blue-100 px-4 leading-relaxed">
            Join our community and start showcasing your work today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group w-full sm:w-auto px-10 py-5 bg-white text-blue-700 font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                Create Your Free Account
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-xl backdrop-blur-sm bg-white bg-opacity-10 hover:bg-opacity-20 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Already a member? Sign In
            </Link>
          </div>
          <p className="mt-8 text-blue-200 text-sm">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
