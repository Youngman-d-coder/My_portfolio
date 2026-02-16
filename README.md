# Multi-User Portfolio Platform

A modern, full-stack web platform that enables developers, designers, and creators to create and showcase their professional portfolios with advanced customization features.

## ✨ New Features (v2.0)

### 🎨 **Professional Templates**
- Choose from 5 professionally designed templates
- Templates for different professions (Developer, Designer, Entrepreneur, Academic)
- One-click application with pre-configured themes and content

### 🖼️ **Image Upload & Management**
- Upload custom profile avatars (with crop tool)
- Add banner images to your portfolio header
- Image cropping with adjustable crop area
- Cloudinary integration for cloud storage

### 🎯 **Drag-and-Drop Reordering**
- Reorder skills by dragging and dropping
- Visual drag handles for intuitive UX
- Smooth animations and instant save

### 🎨 **Enhanced Theming**
- Extended color palette (primary, secondary, accent)
- Custom font family selection
- Live theme preview

### 📂 **Skill Categorization**
- Organize skills by category (Frontend, Backend, Design, etc.)
- Better portfolio structure and presentation

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
- **Modern Libraries**: React 18, @dnd-kit for drag-and-drop, react-image-crop
- **Cloud Storage**: Cloudinary integration for image hosting

## Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 4.9.5** - Type safety
- **Tailwind CSS 3.4** - Styling
- **React Router 7** - Navigation
- **@dnd-kit** - Drag and drop
- **react-image-crop** - Image editing
- **Axios** - API client

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Multer 2.0** - File uploads
- **Cloudinary 2.9** - Image storage
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Youngman-d-coder/My_portfolio.git
   cd My_portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   **Frontend** - Create `.env` in root:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   
   **Backend** - Create `.env` in `backend/` folder:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key
   MONGODB_URI=mongodb://localhost:27017/portfolio_platform
   
   # Optional: For image uploads (sign up at https://cloudinary.com)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   # Backend runs on http://localhost:5000
   ```

7. **Start the frontend** (in a new terminal)
   ```bash
   npm start
   # Frontend runs on http://localhost:3000
   ```

The application will open at `http://localhost:3000`

### Production Build

```bash
npm run build
# Creates optimized production build in /build folder
```

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

### Upload (NEW in v2.0)
- `POST /api/upload/image` - Upload single image (requires auth)
- `POST /api/upload/images` - Upload multiple images (requires auth)

## 📖 Documentation

- **[OVERHAUL_REPORT.md](./OVERHAUL_REPORT.md)** - Complete technical documentation for v2.0 features
- **[IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md)** - UI/UX enhancement documentation (v1.5)
- **[UI_UX_IMPROVEMENTS.md](./UI_UX_IMPROVEMENTS.md)** - Feature summary for UI/UX updates

## 🚀 What's New in v2.0

### Major Features
1. **Portfolio Templates** - 5 professional templates to quick-start your portfolio
2. **Image Uploads** - Avatar and banner image support with built-in crop tool
3. **Drag-and-Drop** - Reorder skills intuitively with drag handles
4. **Enhanced Theming** - More color options and font customization
5. **Skill Categories** - Better organization with skill grouping

### Technical Improvements
- Upgraded Multer to v2.0 (security fixes)
- Upgraded Cloudinary to v2.9 (security fixes)
- Added @dnd-kit for smooth drag-and-drop
- Enhanced TypeScript interfaces
- Better component architecture

## 📸 Screenshots

(Add screenshots here after deployment)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT
