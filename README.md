# HackHazards

A full-stack web application for managing and tracking cybersecurity hazards and vulnerabilities.

## Features

- User authentication (register/login)
- Hazard reporting and tracking
- Real-time updates
- Secure data storage
- Modern UI/UX

## Tech Stack

- Frontend: React.js, TypeScript, TailwindCSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
hackhazards/
├── backend/           # Backend server
│   ├── src/
│   │   ├── models/   # Database models
│   │   ├── routes/   # API routes
│   │   └── server.ts # Main server file
│   └── package.json
├── frontend/         # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5003
   MONGODB_URI=mongodb://127.0.0.1:27017/hackhazards
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   GROQ_API_KEY=your_groq_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5003
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. #   h a c k 1  
 