import { initializeApp } from "firebase/app";

import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();
export { auth };
export default db;
