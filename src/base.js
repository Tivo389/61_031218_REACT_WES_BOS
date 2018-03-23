import Rebase from 're-base';  // Mirrors our state to Firebase
import firebase from 'firebase';  // Official Firebase package

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDrdYRG7g3nvP8evnBl9CHIs5N1pT0PLk8",
  authDomain: "catch-of-the-day-tivo389.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-tivo389.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database()); //.database() returns the Firebase DB that we have

export { firebaseApp };
export default base;