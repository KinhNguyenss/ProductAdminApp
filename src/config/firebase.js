import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDI1yqvP4vqE1MQn7807v3Q6N2dCjv1qVE",
  authDomain: "gen-lang-client-0702693057.firebaseapp.com",
  projectId: "gen-lang-client-0702693057",
  storageBucket: "gen-lang-client-0702693057.firebasestorage.app",
  messagingSenderId: "996973451888",
  appId: "1:996973451888:web:b94061599d684eeb57b2b5",
  measurementId: "G-L3JEH683LP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
