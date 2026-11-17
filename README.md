# Aashar International - Elite Medical Response

A modern, production-ready React + Vite application for elite medical response, urgent triage, and specialist booking powered by **Firebase Firestore** and **Groq AI (Llama 3.3 70B)**.

---

## 🚀 Features

- **⚡ Modern React + Vite Architecture**: Lightning-fast load times, dark futuristic medical response theme, responsive on all screen sizes.
- **🔥 Firebase Firestore Integration**:
  - Live Consultation bookings (`appointments` collection).
  - Rapid Emergency ambulance dispatches with live ETA (`emergency_dispatches` collection).
  - Triage chat audit logging (`dispatch_chat_logs` collection).
- **🤖 Groq AI Triage (Llama 3.3 70B)**:
  - Free high-token-limit model (`llama-3.3-70b-versatile`).
  - Emergency protocol recognition (chest pain, stroke, trauma).
  - Real-time conversation memory & fallback handlers.
- **🚑 Live Dispatch Protocol Modal**: Instant 1-click tactical paramedic dispatch simulation with generated dispatch ticket ID.
- **📊 Live Operations & Records Dashboard**: Real-time view with tab switching between incoming appointments and active dispatches.

---

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite dev server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **"Add New Project"** and import this repository.
3. Vercel will automatically detect **Vite**:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**!

---

## 🔐 Firestore Security Rules

To enable your free Firestore database to accept bookings and dispatches, copy and paste the rules from `firestore.rules` into your [Firebase Console](https://console.firebase.google.com/) under **Firestore Database -> Rules**:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Appointments
    match /appointments/{appointmentId} {
      allow read, write: if true;
    }

    // Emergency Dispatches
    match /emergency_dispatches/{dispatchId} {
      allow read, write: if true;
    }

    // Chat Logs
    match /dispatch_chat_logs/{logId} {
      allow read, write: if true;
    }
  }
}
```
