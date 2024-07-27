import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWoXB9FqedSQ9Qv2omRmLxEpNKV085Sk8",
  authDomain: "pdf-ai-5742e.firebaseapp.com",
  projectId: "pdf-ai-5742e",
  storageBucket: "pdf-ai-5742e.appspot.com",
  messagingSenderId: "1094298423028",
  appId: "1:1094298423028:web:2c7ff687d11489b49658a1",
  measurementId: "G-JYZYPEJCJH",
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
