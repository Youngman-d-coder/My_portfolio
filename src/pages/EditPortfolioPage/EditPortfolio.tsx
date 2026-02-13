import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { portfolioService, Portfolio, Skill, Project } from '../../services/portfolioService';

const EditPortfolio: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await portfolioService.updatePortfolio(portfolio);
      setMessage({ type: 'success', text: 'Portfolio updated successfully!' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update portfolio' 
      });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    setPortfolio({
      ...portfolio,
      skills: [...(portfolio.skills || []), { name: '', level: 'Intermediate' as const }]
    });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...(portfolio.skills || [])];
    newSkills.splice(index, 1);
    setPortfolio({ ...portfolio, skills: newSkills });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...(portfolio.skills || [])];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setPortfolio({ ...portfolio, skills: newSkills });
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
  };

  const removeProject = (index: number) => {
    const newProjects = [...(portfolio.projects || [])];
    newProjects.splice(index, 1);
    setPortfolio({ ...portfolio, projects: newProjects });
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...(portfolio.projects || [])];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setPortfolio({ ...portfolio, projects: newProjects });
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Portfolio</h1>
          <p className="text-gray-600">Customize your portfolio to showcase your work</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio Title
                </label>
                <input
                  type="text"
                  value={portfolio.title || ''}
                  onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My Portfolio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={portfolio.tagline || ''}
                  onChange={(e) => setPortfolio({ ...portfolio, tagline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Web Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About
                </label>
                <textarea
                  value={portfolio.about || ''}
                  onChange={(e) => setPortfolio({ ...portfolio, about: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={portfolio.isPublic || false}
                    onChange={(e) => setPortfolio({ ...portfolio, isPublic: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Make portfolio public</span>
                </label>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Skill
              </button>
            </div>

            <div className="space-y-3">
              {portfolio.skills?.map((skill, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    placeholder="Skill name"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(index, 'level', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
              <button
                type="button"
                onClick={addProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Project
              </button>
            </div>

            <div className="space-y-6">
              {portfolio.projects?.map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      placeholder="Project title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      placeholder="Project description"
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      placeholder="Project URL"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={project.technologies?.join(', ') || ''}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                      placeholder="Technologies (comma-separated)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={project.featured || false}
                          onChange={(e) => updateProject(index, 'featured', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Featured project</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Remove Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact & Social Links</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={portfolio.contact?.email || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    contact: { ...portfolio.contact, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <input
                  type="url"
                  value={portfolio.socialLinks?.github || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    socialLinks: { ...portfolio.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={portfolio.socialLinks?.linkedin || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    socialLinks: { ...portfolio.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  value={portfolio.socialLinks?.twitter || ''}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    socialLinks: { ...portfolio.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Theme</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={portfolio.theme?.primaryColor || '#1e40af'}
                  onChange={(e) => setPortfolio({ 
                    ...portfolio, 
                    theme: { ...portfolio.theme, primaryColor: e.target.value, secondaryColor: portfolio.theme?.secondaryColor || '#ffffff' }
                  })}
                  className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPortfolio;
