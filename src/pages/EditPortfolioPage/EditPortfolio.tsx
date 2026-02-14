import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { portfolioService, Portfolio, Skill, Project } from '../../services/portfolioService';
import SkeletonLoader from '../../components/SkeletonLoader';
import AuthNavbar from '../../components/AuthNavbar';

const EditPortfolio: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [hasChanges, setHasChanges] = useState(false);
  
  const [portfolio, setPortfolio] = useState<Partial<Portfolio>>({
    title: '',
    tagline: '',
    about: '',
    skills: [],
    projects: [],
    contact: {},
    socialLinks: {},
    theme: { primaryColor: '#1e40af', secondaryColor: '#ffffff' },
    isPublic: true
  });

  const fetchPortfolio = useCallback(async () => {
    try {
      const data = await portfolioService.getMyPortfolio();
      setPortfolio(data);
      setHasChanges(false);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      showToast('Failed to load portfolio', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPortfolio();
  }, [user, navigate, fetchPortfolio]);

  // Auto-save functionality
  useEffect(() => {
    if (!hasChanges) return;

    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio, hasChanges]);

  const handleAutoSave = async () => {
    if (autoSaving || saving) return;
    
    setAutoSaving(true);
    try {
      await portfolioService.updatePortfolio(portfolio);
      setHasChanges(false);
      showToast('Changes saved automatically', 'success');
    } catch (error: any) {
      console.error('Auto-save failed:', error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await portfolioService.updatePortfolio(portfolio);
      setMessage({ type: 'success', text: 'Portfolio updated successfully!' });
      setHasChanges(false);
      showToast('Portfolio saved successfully!', 'success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Failed to update portfolio';
      setMessage({ type: 'error', text: errorMsg });
      showToast(errorMsg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    setPortfolio({
      ...portfolio,
      skills: [...(portfolio.skills || []), { name: '', level: 'Intermediate' as const }]
    });
    setHasChanges(true);
  };

  const removeSkill = (index: number) => {
    const newSkills = [...(portfolio.skills || [])];
    newSkills.splice(index, 1);
    setPortfolio({ ...portfolio, skills: newSkills });
    setHasChanges(true);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...(portfolio.skills || [])];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setPortfolio({ ...portfolio, skills: newSkills });
    setHasChanges(true);
  };

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [...(portfolio.projects || []), { 
        title: '', 
        description: '', 
        link: '', 
        technologies: [],
        featured: false 
      }]
    });
    setHasChanges(true);
  };

  const removeProject = (index: number) => {
    const newProjects = [...(portfolio.projects || [])];
    newProjects.splice(index, 1);
    setPortfolio({ ...portfolio, projects: newProjects });
    setHasChanges(true);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...(portfolio.projects || [])];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setPortfolio({ ...portfolio, projects: newProjects });
    setHasChanges(true);
  };

  if (loading) {
    return (
      <>
        <AuthNavbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 px-4 pt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 animate-pulse">
              <div className="h-10 bg-gray-300 rounded w-1/2 mb-2 animate-shimmer"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-shimmer"></div>
            </div>
            <div className="space-y-6">
              <SkeletonLoader type="card" count={3} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 transform hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Portfolio
              </h1>
              <p className="text-gray-600">Customize your portfolio to showcase your work</p>
            </div>
            {/* Auto-save indicator */}
            <div className="flex items-center space-x-2">
              {autoSaving && (
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              )}
              {hasChanges && !autoSaving && (
                <div className="flex items-center text-amber-600 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Unsaved changes
                </div>
              )}
              {!hasChanges && !autoSaving && !loading && (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  All changes saved
                </div>
              )}
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-500' 
              : 'bg-red-50 text-red-700 border-red-500'
          } animate-fade-in`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transform hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-7 bg-blue-600 rounded-full mr-3"></span>
              Basic Information
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio Title
                </label>
                <input
                  type="text"
                  value={portfolio.title || ''}
                  onChange={(e) => {
                    setPortfolio({ ...portfolio, title: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  placeholder="My Portfolio"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={portfolio.tagline || ''}
                  onChange={(e) => {
                    setPortfolio({ ...portfolio, tagline: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  placeholder="Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  value={portfolio.about || ''}
                  onChange={(e) => {
                    setPortfolio({ ...portfolio, about: e.target.value });
                    setHasChanges(true);
                  }}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={portfolio.isPublic || false}
                    onChange={(e) => setPortfolio({ ...portfolio, isPublic: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Make portfolio public</span>
                </label>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transform hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                <span className="w-2 h-7 bg-blue-600 rounded-full mr-3"></span>
                Skills
              </h2>
              <button
                type="button"
                onClick={addSkill}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Skill
              </button>
            </div>

            <div className="space-y-3">
              {portfolio.skills?.map((skill, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-100 hover:border-blue-200 transition-colors duration-200">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    placeholder="Skill name (e.g., React)"
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(index, 'level', e.target.value)}
                    className="w-full sm:w-40 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 sm:mr-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="sm:hidden">Remove</span>
                  </button>
                </div>
              ))}
              {(!portfolio.skills || portfolio.skills.length === 0) && (
                <p className="text-gray-500 text-center py-8">No skills added yet. Click "Add Skill" to get started!</p>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transform hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                <span className="w-2 h-7 bg-blue-600 rounded-full mr-3"></span>
                Projects
              </h2>
              <button
                type="button"
                onClick={addProject}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-md flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Project
              </button>
            </div>

            <div className="space-y-6">
              {portfolio.projects?.map((project, index) => (
                <div key={index} className="p-5 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      placeholder="Project title"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none font-semibold"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      placeholder="Project description"
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"
                    />
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      placeholder="Project URL (https://...)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    />
                    <input
                      type="text"
                      value={project.technologies?.join(', ') || ''}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                      placeholder="Technologies (comma-separated, e.g., React, Node.js, MongoDB)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={project.featured || false}
                          onChange={(e) => updateProject(index, 'featured', e.target.checked)}
                          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="ml-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Featured project</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(!portfolio.projects || portfolio.projects.length === 0) && (
                <p className="text-gray-500 text-center py-8">No projects added yet. Click "Add Project" to showcase your work!</p>
              )}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transform hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-7 bg-blue-600 rounded-full mr-3"></span>
              Contact & Social Links
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  value={portfolio.contact?.email || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    contact: { ...portfolio.contact, email: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </label>
                <input
                  type="url"
                  value={portfolio.socialLinks?.github || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    socialLinks: { ...portfolio.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={portfolio.socialLinks?.linkedin || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    socialLinks: { ...portfolio.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </label>
                <input
                  type="url"
                  value={portfolio.socialLinks?.twitter || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    socialLinks: { ...portfolio.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transform hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-7 bg-blue-600 rounded-full mr-3"></span>
              Theme
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={portfolio.theme?.primaryColor || '#1e40af'}
                    onChange={(e) => setPortfolio({ 
                      ...portfolio, 
                      theme: { ...portfolio.theme, primaryColor: e.target.value, secondaryColor: portfolio.theme?.secondaryColor || '#ffffff' }
                    })}
                    className="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={portfolio.theme?.primaryColor || '#1e40af'}
                      onChange={(e) => setPortfolio({ 
                        ...portfolio, 
                        theme: { ...portfolio.theme, primaryColor: e.target.value, secondaryColor: portfolio.theme?.secondaryColor || '#ffffff' }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none font-mono"
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end sticky bottom-4 bg-white rounded-xl shadow-lg p-4 border-2 border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditPortfolio;
