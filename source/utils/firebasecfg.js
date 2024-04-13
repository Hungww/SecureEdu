import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, getReactNativePersistence, initializeAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDjh9A1QYMrHewnfSX9FiRlU4P2prewiQc",
    authDomain: "fe-mobile-282d9.firebaseapp.com",
    projectId: "fe-mobile-282d9",
    storageBucket: "fe-mobile-282d9.appspot.com",
    messagingSenderId: "303928699816",
    appId: "1:303928699816:web:c971cec6d337aaef6bcb9d"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = initializeAuth(app, {persistence: getReactNativePersistence()});
  export {db, auth};