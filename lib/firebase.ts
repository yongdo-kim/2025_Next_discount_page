import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmhqEnNos698lFARZgM2-QbqJ2l8Gi_l4",
  authDomain: "find-discount-189ec.firebaseapp.com",
  projectId: "find-discount-189ec",
  storageBucket: "find-discount-189ec.firebasestorage.app",
  messagingSenderId: "382872862619",
  appId: "1:382872862619:web:609c30ca39c2fabddc2b3e",
  measurementId: "G-7MSFKE0YV8"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isAnalyticsSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics };
