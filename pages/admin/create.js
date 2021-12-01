import { addDoc, collection, doc, serverTimestamp } from '@firebase/firestore';
import _ from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthCheck from '../../components/AuthCheck';
import Metatags from '../../components/Metatags';
import { UserContext } from '../../lib/context';
import {
  auth,
  firestore,
  getAllDocumentsInACollection,
} from '../../lib/firebase';
import CreatePostForm from './CreatePostForm';

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);

  const [tags, setTags] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    setTags(statefulTags);
  }, []);

  // ensure slug is URL safe
  const slug = encodeURI(_.kebabCase(title));

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;

    const userRef = doc(firestore, 'users', uid);

    // Tip: give all fields a default value here
    const data = {
      title,
      content,
      published: Boolean(published),
      slug,
      uid,
      username,
      tags,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await addDoc(collection(userRef, 'posts'), data);

    toast.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return <CreatePostForm submitHandler={createPost} tags={tags} />;
}

const CreatePost = () => {
  return (
    <AuthCheck>
      <main>
        <Metatags title="creating a new post" />
        <CreateNewPost />
      </main>
    </AuthCheck>
  );
};

export default CreatePost;
