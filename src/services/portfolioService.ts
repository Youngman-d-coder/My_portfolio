import api from './api';

export interface Portfolio {
  _id?: string;
  userId: string;
  title: string;
  tagline: string;
  about: string;
  avatar?: string;
  bannerImage?: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: Contact;
  socialLinks: SocialLinks;
  theme: Theme;
  isPublic: boolean;
  user?: {
    username: string;
    displayName: string;
    avatar?: string;
    bio?: string;
  };
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface Project {
  name?: string;
  title?: string;
  description: string;
  link?: string;
  image?: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  fontFamily?: string;
}

export const portfolioService = {
  async getPortfolio(username: string) {
    const response = await api.get(`/portfolio/${username}`);
    return response.data;
  },

  async getMyPortfolio() {
    const response = await api.get('/portfolio/my');
    return response.data;
  },

  async updatePortfolio(data: Partial<Portfolio>) {
    const response = await api.put('/portfolio/my', data);
    return response.data;
  },

  async getAllPortfolios(search?: string, page: number = 1, limit: number = 12) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await api.get(`/portfolio/all?${params.toString()}`);
    return response.data;
  }
};
