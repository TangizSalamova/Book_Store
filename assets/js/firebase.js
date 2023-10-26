// Import the functions you need from the SDKs you need
import {
    initializeApp
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
  import {
      getDatabase
    } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCHfa0S86KEYLyikRp00jeTLNT8RR2cIqw",
    authDomain: "book-store-project-793db.firebaseapp.com",
    databaseURL: "https://book-store-project-793db-default-rtdb.firebaseio.com",
    projectId: "book-store-project-793db",
    storageBucket: "book-store-project-793db.appspot.com",
    messagingSenderId: "730792169861",
    appId: "1:730792169861:web:e095d5c745c6f1434574ec",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);