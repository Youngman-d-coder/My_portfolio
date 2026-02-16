const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'My Portfolio'
  },
  tagline: {
    type: String,
    default: 'Web Developer'
  },
  about: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  bannerImage: {
    type: String,
    default: ''
  },
  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    },
    category: String
  }],
  projects: [{
    name: String,
    title: String,
    description: String,
    link: String,
    image: String,
    images: [String],
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    featured: {
      type: Boolean,
      default: false
    }
  }],
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    degree: String,
    school: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  contact: {
    email: String,
    phone: String,
    location: String,
    website: String
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String
  },
  theme: {
    primaryColor: {
      type: String,
      default: '#1e40af'
    },
    secondaryColor: {
      type: String,
      default: '#ffffff'
    },
    accentColor: {
      type: String,
      default: '#3b82f6'
    },
    fontFamily: {
      type: String,
      default: 'Inter, sans-serif'
    }
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

portfolioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
