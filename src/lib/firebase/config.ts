import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';

export interface FirebaseConfigObject {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export function getActiveFirebaseConfig(): FirebaseConfigObject {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('hpsc_firebase_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.apiKey && parsed.projectId) {
          return parsed;
        }
      }
    } catch {}
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  };
}

export function checkIsFirebaseConfigured(cfg?: FirebaseConfigObject): boolean {
  const config = cfg || getActiveFirebaseConfig();
  return Boolean(
    config.apiKey &&
    config.projectId &&
    !config.projectId.includes('your-project-id') &&
    config.apiKey.length > 5
  );
}

export function initializeFirebaseWithConfig(config: FirebaseConfigObject): {
  success: boolean;
  app?: FirebaseApp;
  db?: Firestore;
  error?: string;
} {
  try {
    const existing = getApps();
    let app: FirebaseApp;
    if (existing.length > 0) {
      app = existing[0];
    } else {
      app = initializeApp(config);
    }
    const firestore = getFirestore(app);
    return { success: true, app, db: firestore };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export function getFirebaseApp(): FirebaseApp | null {
  const config = getActiveFirebaseConfig();
  if (!config.apiKey || !config.projectId || config.projectId.includes('your-project-id')) {
    return null;
  }
  const existing = getApps();
  if (existing.length > 0) {
    return existing[0];
  }
  try {
    return initializeApp(config);
  } catch (e) {
    return null;
  }
}

export function getFirestoreDb(): Firestore | null {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const app = getFirebaseApp();
  return app ? getStorage(app) : null;
}

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

// Default static exports for backward compatibility
const defaultApp = getFirebaseApp();
export const db: Firestore | null = defaultApp ? getFirestore(defaultApp) : null;
export const storage: FirebaseStorage | null = defaultApp ? getStorage(defaultApp) : null;
export const auth: Auth | null = defaultApp ? getAuth(defaultApp) : null;
export const isFirebaseConfigured = checkIsFirebaseConfigured();

export default defaultApp;
