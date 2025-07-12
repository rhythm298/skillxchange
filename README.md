# Skill Swap Platform

A modern web application built with React, TypeScript, and Firebase that enables users to exchange skills and knowledge. Users can create profiles, list their skills, and request skill swaps with other users.

## Features

- 🔐 Firebase Authentication (email & password)
- 👥 User Profiles with Skills
- 🔄 Skill Swap Request System
- 📸 Profile Photo Upload
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design
- 🔍 Search & Filter Functionality

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd skillxchange
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Email/Password Authentication
   - Create a Firestore Database
   - Enable Storage

4. Create a `.env` file in the root directory with your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. Seed the database with dummy users (optional):
```bash
npm run seed
```

6. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── lib/             # Firebase and other configurations
├── pages/           # Page components
├── scripts/         # Database seeding and utilities
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run seed` - Seeds the database with dummy users
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
