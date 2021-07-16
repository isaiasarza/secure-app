import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCAHDpeAc4tEBIpm2adraLdi7UUgJbkx9c",
  authDomain: "app-2a067.firebaseapp.com",
  projectId: "app-2a067",
  storageBucket: "app-2a067.appspot.com",
  messagingSenderId: "137675311703",
  appId: "1:137675311703:web:103438c8965df55786b112",
};

firebase.initializeApp(config);

export async function loginUser(username: string, password: string): Promise<boolean> {
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(username, password);
    console.log("loginUser res",res)
    return true;
  } catch (error) {
    console.error("loginUser error",error)
    return false;
  }
}


