# Portfolio Platform Backend

This is the backend API for the multi-user portfolio platform.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and JWT secret.

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Portfolio
- `GET /api/portfolio/all` - Get all public portfolios
- `GET /api/portfolio/my` - Get current user's portfolio (requires auth)
- `PUT /api/portfolio/my` - Update current user's portfolio (requires auth)
- `GET /api/portfolio/:username` - Get specific user's portfolio

## Database Setup

This application uses MongoDB. You can either:

1. Install MongoDB locally
2. Use MongoDB Atlas (free cloud database)

For local development, MongoDB should be running on `mongodb://localhost:27017`
