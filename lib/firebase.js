import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCqe-uODGXmcGXurvs2f1rcUNdvZVOxc2w',
  authDomain: 'fireship-next-72d0f.firebaseapp.com',
  projectId: 'fireship-next-72d0f',
  storageBucket: 'fireship-next-72d0f.appspot.com',
  messagingSenderId: '47921489746',
  appId: '1:47921489746:web:72828a77b0d710ae473c8b',
  measurementId: 'G-QEWZ4P1HW2',
};

// if (!getApps().length) {
//   firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { firestore, auth, provider };
