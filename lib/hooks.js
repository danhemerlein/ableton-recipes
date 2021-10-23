import { onAuthStateChanged } from '@firebase/auth';
import { doc, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';

export function useUserData() {
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const usernameDoc = doc(firestore, 'users', user.uid);

        onSnapshot(usernameDoc, (doc) => {
          setUsername(doc.data().username);
        });
      } else {
        setUser(null);
        setUsername(null);
      }
    });
    return () => {
      unlisten();
    };
  }, [user]);

  return { user, username };
}
