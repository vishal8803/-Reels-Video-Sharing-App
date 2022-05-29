import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// Reels app Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCcbmXaUyqFTtOYhNIfcJLaykpr496SnfA",
  authDomain: "reels-48980.firebaseapp.com",
  projectId: "reels-48980",
  storageBucket: "reels-48980.appspot.com",
  messagingSenderId: "1039616967844",
  appId: "1:1039616967844:web:ad826791fd0edf689ad231",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
  users: firestore.collection("users"),
  posts: firestore.collection("posts"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
