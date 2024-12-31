import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

try {
  // Only initialize Firebase if all required config values are present
  if (Object.values(firebaseConfig).every(value => value !== undefined)) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn('Firebase configuration is incomplete. Some features may not work.');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export function getDb(): Firestore {
  if (!db) {
    throw new Error('Firestore is not initialized. Check your Firebase configuration.');
  }
  return db;
}