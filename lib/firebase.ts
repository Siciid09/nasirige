import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// 1. Paste your Firebase Config keys here
const firebaseConfig = {
  apiKey: "AIzaSyAjC2Qx7lGOmm3Oa0Ghs10JI99ljC9QEr8",
  authDomain: "nasirige1.firebaseapp.com",
  projectId: "nasirige1",
  storageBucket: "nasirige1.firebasestorage.app",
  messagingSenderId: "759804660634",
  appId: "1:759804660634:web:a368a3a9c2d7b5ddff0823",
  measurementId: "G-JY9BZMY4Z4"
};

// 2. Initialize Firebase (prevents re-initialization errors in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// 3. Export the 'trackVisit' function
export const trackVisit = async () => {
  if (typeof window === "undefined") return; // Don't run on server
  try {
    await addDoc(collection(db, "page_visits"), {
      page: "home",
      timestamp: serverTimestamp(),
      userAgent: window.navigator.userAgent || "unknown"
    });
  } catch (e) {
    console.error("Error tracking visit: ", e);
  }
};

// 4. Export the 'saveFormData' function (This fixes your error)
export const saveFormData = async (collectionName: string, data: any) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      timestamp: serverTimestamp()
    });
    return { success: true };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, error: e };
  }
};

export { db, app };