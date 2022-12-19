import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_SECRET,
  authDomain: "gesund-admin.firebaseapp.com",
  databaseURL: "https://gesund-admin-default-rtdb.firebaseio.com",
  projectId: "gesund-admin",
  storageBucket: "gesund-admin.appspot.com",
  messagingSenderId: "1060738427390",
  appId: "1:1060738427390:web:66c2b31f1cd0c25d5db8af",
  measurementId: "G-YYEWMRQB4G"
  };

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);



