// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRBexN2EzB5dWDNNtbfeKJcdjNTn5H45M",
  authDomain: "food-vingo.firebaseapp.com",
  projectId: "food-vingo",
  storageBucket: "food-vingo.firebasestorage.app",
  messagingSenderId: "1038809012899",
  appId: "1:1038809012899:web:0bef4ab838a11e3354fd16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{app,auth}
