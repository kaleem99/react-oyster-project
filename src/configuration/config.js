// In your main React component or index.js
import {initializeApp} from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/database";

const firebaseConfig = {
  // Your Firebase config here (apiKey, authDomain, databaseURL, projectId, etc.)
  apiKey: "AIzaSyBFiT22w997lStopMFUy63JK3Oi5DBQXlA",
  authDomain: "oyster-video-project.firebaseapp.com",
  projectId: "oyster-video-project",
  storageBucket: "oyster-video-project.appspot.com",
  messagingSenderId: "605982084351",
  appId: "1:605982084351:web:d3c962173ce4eabd5f50ca",
};

initializeApp(firebaseConfig);
const database = getDatabase();
export default database;
