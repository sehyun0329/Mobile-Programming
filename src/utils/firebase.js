import config from "../../firebase.json";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { getDatabase, ref, push } from "firebase/database";

const app = firebase.initializeApp(config);

const Auth = app.auth();

const databaseRef = getDatabase(app);

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signUp = async ({ email, password }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  return user;
};

export const saveTouchableOpacityValue = (value, tempAvg) => {
  const data = {
    value: value,
    tempAvg: tempAvg,
  };

  push(ref(databaseRef, "/clickValues"), data)
    .then(() => {
      console.log("Value saved successfully!");
    })
    .catch((error) => {
      console.log("Error saving value: ", error);
    });
};
