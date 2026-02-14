import React from 'react';
import { Portfolio } from '../services/portfolioService';

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    fontFamily?: string;
  };
  defaultContent: Partial<Portfolio>;
}

export const portfolioTemplates: readonly PortfolioTemplate[] = [
  {
    id: 'minimal',
    name: 'Minimal Professional',
    description: 'Clean and simple design for a professional look',
    preview: '📄',
    theme: {
      primaryColor: '#1e40af',
      secondaryColor: '#ffffff',
      accentColor: '#3b82f6',
      fontFamily: 'Inter, sans-serif',
    },
    defaultContent: {
      title: 'Your Name',
      tagline: 'Your Professional Title',
      about: 'A brief introduction about yourself and your expertise.',
      skills: [
        { name: 'JavaScript', level: 'Expert', category: 'Frontend' },
        { name: 'React', level: 'Advanced', category: 'Frontend' },
        { name: 'Node.js', level: 'Intermediate', category: 'Backend' },
      ],
      projects: [
        {
          name: 'Sample Project',
          description: 'A brief description of your project',
          technologies: ['React', 'TypeScript'],
          githubUrl: '',
          liveUrl: '',
        },
      ],
      theme: {
        primaryColor: '#1e40af',
        secondaryColor: '#ffffff',
      },
    },
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold and colorful for creative professionals',
    preview: '🎨',
    theme: {
      primaryColor: '#7c3aed',
      secondaryColor: '#f3e8ff',
      accentColor: '#a78bfa',
      fontFamily: 'Poppins, sans-serif',
    },
    defaultContent: {
      title: 'Your Name',
      tagline: 'Creative Designer & Artist',
      about: 'Passionate about creating beautiful and functional designs.',
      skills: [
        { name: 'UI/UX Design', level: 'Expert', category: 'Design' },
        { name: 'Figma', level: 'Advanced', category: 'Tools' },
        { name: 'Adobe XD', level: 'Advanced', category: 'Tools' },
      ],
      projects: [
        {
          name: 'Design Project',
          description: 'A creative design showcase',
          technologies: ['Figma', 'Photoshop'],
          githubUrl: '',
          liveUrl: '',
        },
      ],
      theme: {
        primaryColor: '#7c3aed',
        secondaryColor: '#f3e8ff',
      },
    },
  },
  {
    id: 'developer',
    name: 'Full-Stack Developer',
    description: 'Technical and modern for developers',
    preview: '💻',
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#ffffff',
      accentColor: '#10b981',
      fontFamily: 'Fira Code, monospace',
    },
    defaultContent: {
      title: 'Your Name',
      tagline: 'Full-Stack Developer',
      about: 'Building scalable web applications with modern technologies.',
      skills: [
        { name: 'React', level: 'Expert', category: 'Frontend' },
        { name: 'Node.js', level: 'Expert', category: 'Backend' },
        { name: 'MongoDB', level: 'Advanced', category: 'Database' },
        { name: 'Docker', level: 'Intermediate', category: 'DevOps' },
      ],
      projects: [
        {
          name: 'Web Application',
          description: 'Full-stack MERN application',
          technologies: ['React', 'Node.js', 'MongoDB'],
          githubUrl: '',
          liveUrl: '',
        },
      ],
      theme: {
        primaryColor: '#059669',
        secondaryColor: '#ffffff',
      },
    },
  },
  {
    id: 'startup',
    name: 'Startup Founder',
    description: 'Dynamic and engaging for entrepreneurs',
    preview: '🚀',
    theme: {
      primaryColor: '#dc2626',
      secondaryColor: '#ffffff',
      accentColor: '#ef4444',
      fontFamily: 'Montserrat, sans-serif',
    },
    defaultContent: {
      title: 'Your Name',
      tagline: 'Entrepreneur & Innovator',
      about: 'Building products that solve real-world problems.',
      skills: [
        { name: 'Product Management', level: 'Expert', category: 'Business' },
        { name: 'Marketing', level: 'Advanced', category: 'Business' },
        { name: 'Team Leadership', level: 'Advanced', category: 'Soft Skills' },
      ],
      projects: [
        {
          name: 'Startup Project',
          description: 'Revolutionary product idea',
          technologies: ['Innovation', 'Leadership'],
          githubUrl: '',
          liveUrl: '',
        },
      ],
      theme: {
        primaryColor: '#dc2626',
        secondaryColor: '#ffffff',
      },
    },
  },
  {
    id: 'academic',
    name: 'Academic Researcher',
    description: 'Professional and scholarly appearance',
    preview: '📚',
    theme: {
      primaryColor: '#0369a1',
      secondaryColor: '#ffffff',
      accentColor: '#0284c7',
      fontFamily: 'Georgia, serif',
    },
    defaultContent: {
      title: 'Your Name',
      tagline: 'Researcher & Academic',
      about: 'Conducting research in [Your Field] with focus on [Your Specialty].',
      skills: [
        { name: 'Research', level: 'Expert', category: 'Academic' },
        { name: 'Data Analysis', level: 'Advanced', category: 'Technical' },
        { name: 'Academic Writing', level: 'Expert', category: 'Communication' },
      ],
      projects: [
        {
          name: 'Research Project',
          description: 'Academic research in [Field]',
          technologies: ['Python', 'R', 'LaTeX'],
          githubUrl: '',
          liveUrl: '',
        },
      ],
      theme: {
        primaryColor: '#0369a1',
        secondaryColor: '#ffffff',
      },
    },
  },
];

interface PortfolioTemplatesProps {
  onSelectTemplate: (template: PortfolioTemplate) => void;
  onClose: () => void;
}

const PortfolioTemplates: React.FC<PortfolioTemplatesProps> = ({
  onSelectTemplate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Choose a Template
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Start with a professionally designed template
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioTemplates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onSelectTemplate(template)}
              >
                <div
                  className="h-32 flex items-center justify-center text-6xl"
                  style={{
                    background: `linear-gradient(135deg, ${template.theme.primaryColor} 0%, ${template.theme.accentColor || template.theme.secondaryColor} 100%)`,
                  }}
                >
                  {template.preview}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {template.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: template.theme.primaryColor }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: template.theme.accentColor || template.theme.secondaryColor }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {template.theme.fontFamily?.split(',')[0] || 'Default'}
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors group-hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(template);
                    }}
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You can customize any template after selecting it. The template provides a starting point with pre-configured colors, sample content, and structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTemplates;
