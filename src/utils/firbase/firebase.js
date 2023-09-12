
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

// import {getStorage} from 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCxmtMe5i5s9-Ev2Up3VEvEcb3Mrp8ZGN4",
    authDomain: "fir-auth-c32cb.firebaseapp.com",
    projectId: "fir-auth-c32cb",
    storageBucket: "fir-auth-c32cb.appspot.com",
    messagingSenderId: "885746069575",
    appId: "1:885746069575:web:8de2ba33931fc3918d8162",
    measurementId: "G-22ELXCFPN0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth()
const db=firebase.firestore()
// const storage=firebase.getStorage()
const storageRef = firebase.storage().ref();
export {db,auth,storageRef} 