// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkEYtVqCNnNpggOsFK-XM7g_rX24ew7Rs",
  authDomain: "todo-69010.firebaseapp.com",
  projectId: "todo-69010",
  storageBucket: "todo-69010.appspot.com",
  messagingSenderId: "78948333732",
  appId: "1:78948333732:web:d4777e2d4f3e8264d58e31",
  measurementId: "G-0EEHY6H35W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
