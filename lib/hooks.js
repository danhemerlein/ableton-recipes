import { onAuthStateChanged } from '@firebase/auth';
import { doc, onSnapshot, getDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// export function useUserData() {
//   const [username, setUsername] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unlisten = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);

//         const userRef = doc(firestore, 'users', user.uid);

//         onSnapshot(userRef, (doc) => {
//           if (doc.data()) {
//             setUsername(doc.data().username);
//           }
//         });
//       } else {
//         setUser(null);
//         setUsername(null);
//       }
//     });
//     return () => {
//       unlisten();
//     };
//   }, [user]);

//   return { user, username };
// }

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const userRef = doc(firestore, 'users', user.uid);

      unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.data()) {
          setUsername(doc.data().username);
          setAdmin(doc.data().admin);
        }
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return {
    user,
    username,
    admin,
  };
}
