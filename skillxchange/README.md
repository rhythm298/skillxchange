# Skill Swap Platform (MVP)

A React + TypeScript + Firebase application for swapping skills between users.

## Features

- Firebase Authentication (email/password)
- Public profile browsing with search & pagination
- Profile editing with skills & availability
- Swap request workflow (pending / accepted / rejected)
- Responsive UI styled with Tailwind CSS
- Routing with React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Firebase project

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env
# OR on Windows
copy .env.example .env
```

Edit `.env` and fill in your Firebase credentials:

```
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

### Running Locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

### Lint & Format

```bash
npm run lint
npm run format
```

## Firebase Security Rules (suggested)

Ensure only authenticated users can write swap requests and edit their profile:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    match /swapRequests/{requestId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
      allow update: if request.auth != null && (
        // fromUser can cancel; toUser can accept/reject
        (request.resource.data.fromUserId == request.auth.uid) ||
        (request.resource.data.toUserId == request.auth.uid)
      );
    }
  }
}
```

## License

MIT
 