import firebase from "firebase";
import "firebase/firestore";
import { User } from "./model/user";

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
export const auth = firebaseApp.auth()
export async function loginUser(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(username, password);
    console.log("loginUser res", res);
    return true;
  } catch (error) {
    console.error("loginUser error", error);
    return false;
  }
}

export async function createUser(
  username: string,
  password: string,
  user: User
): Promise<User | null> {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(username, password);
    console.log("user credentials created!", res);
    if (res.user) {
      // ;
      try {
        console.log("saving user", user);
        const doc = db.collection("users").doc(res.user.uid);
        console.log("doc", doc);
        const _res = await doc.set(user);
        console.log("user created!", _res);
        return user;
      } catch (error) {
        ;
        console.error("createUser error", error);
        return null;
      }
    }
  } catch (error) {
    console.error("createUser error", error);
    return null;
  }
  return null;
}


export async function logout(){
  return firebase.auth().signOut()
}
