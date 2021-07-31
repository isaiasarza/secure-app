import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage"
const config = {
  apiKey: "AIzaSyCAHDpeAc4tEBIpm2adraLdi7UUgJbkx9c",
  authDomain: "app-2a067.firebaseapp.com",
  projectId: "app-2a067",
  storageBucket: "app-2a067.appspot.com",
  messagingSenderId: "137675311703",
  appId: "1:137675311703:web:103438c8965df55786b112",
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage("gs://app-2a067.appspot.com")
export const auth = firebaseApp.auth()

