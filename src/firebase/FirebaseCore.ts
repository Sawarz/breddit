import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "breddit-fff23.firebaseapp.com",
    projectId: "breddit-fff23",
    storageBucket: "breddit-fff23.appspot.com",
    messagingSenderId: "48843299030",
    appId: "1:48843299030:web:b779da1acfa230be021177"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
  const storage = getStorage();
  
const FirebaseCore = {
    app: app,
    db: db,
    auth: auth,
    storage: storage
  }
  
  export default FirebaseCore;