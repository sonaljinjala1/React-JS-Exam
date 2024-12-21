import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCQlqsxvgfkjIhI0yTA_vJaqXL8qyNG1sE",
  authDomain: "firestrore-c5407.firebaseapp.com",
  projectId: "firestrore-c5407",
  storageBucket: "firestrore-c5407.firebasestorage.app",
  messagingSenderId: "569317488887",
  appId: "1:569317488887:web:b2640580d30dc39dea3bf2",
  measurementId: "G-C0Z1YH7L1M"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();