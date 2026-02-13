# Multi-User Portfolio Platform

A modern, full-stack web platform that enables developers, designers, and creators to create and showcase their professional portfolios.

## Features

### For Users
- **User Authentication**: Secure registration and login system with JWT tokens
- **Personal Portfolio Creation**: Create and customize your own portfolio with:
  - Personal information and bio
  - Skills with proficiency levels
  - Projects showcase with descriptions and links
  - Work experience timeline
  - Contact information and social links
  - Customizable color themes
- **Portfolio Management**: Easy-to-use dashboard for editing portfolio content
- **Public/Private Profiles**: Control portfolio visibility
- **Discovery**: Browse and search other users' portfolios

### For Developers
- **Full-Stack Architecture**: React frontend with Express.js/Node.js backend
- **MongoDB Database**: Scalable NoSQL database for user and portfolio data
- **RESTful API**: Well-structured API endpoints for all operations
- **TypeScript Support**: Type-safe development experience
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies: `npm install`
3. Install backend dependencies: `cd backend && npm install`
4. Set up environment variables (see .env.example files)
5. Start MongoDB
6. Start backend: `cd backend && npm run dev`
7. Start frontend: `npm start`

The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Portfolio
- `GET /api/portfolio/all` - Get all public portfolios
- `GET /api/portfolio/my` - Get current user's portfolio (requires auth)
- `PUT /api/portfolio/my` - Update portfolio (requires auth)
- `GET /api/portfolio/:username` - Get specific user's portfolio

## License

MIT
