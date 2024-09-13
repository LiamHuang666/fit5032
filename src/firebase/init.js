

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
    apiKey: "AIzaSyDX3AGML5C10m5QRpQp1ezv_Jo7B8sKEQY",
    authDomain: "week7-hongyi.firebaseapp.com",
    projectId: "week7-hongyi",
    storageBucket: "week7-hongyi.appspot.com",
    messagingSenderId: "305930063276",
    appId: "1:305930063276:web:ad18448520107a75a4be09"
  };


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;