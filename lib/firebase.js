import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCqe-uODGXmcGXurvs2f1rcUNdvZVOxc2w",
  authDomain: "fireship-next-72d0f.firebaseapp.com",
  projectId: "fireship-next-72d0f",
  storageBucket: "fireship-next-72d0f.appspot.com",
  messagingSenderId: "47921489746",
  appId: "1:47921489746:web:72828a77b0d710ae473c8b",
  measurementId: "G-QEWZ4P1HW2"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
