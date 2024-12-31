import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let initialized = false;

export async function initializeFirebase(): Promise<void> {
  if (initialized) return;

  try {
    if (!Object.values(firebaseConfig).every(value => value !== undefined)) {
      console.warn('Firebase configuration is incomplete. Some features may not work.');
      return;
    }

    app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    // Enable offline persistence
    try {
      await enableIndexedDbPersistence(db);
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
      }
    }

    initialized = true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw new Error('Failed to initialize Firebase. Please check your configuration.');
  }
}

export function getDb(): Firestore {
  if (!db) {
    throw new Error('Firestore is not initialized. Call initializeFirebase() first.');
  }
  return db;
}

// Initialize Firebase when this module is imported
initializeFirebase().catch(console.error);