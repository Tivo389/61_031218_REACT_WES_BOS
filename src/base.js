import Rebase from 're-base';  // Mirrors our state to Firebase
import firebase from 'firebase';  // Official Firebase package
import config from './config';

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database()); //.database() returns the Firebase DB that we have

export { firebaseApp };
export default base;