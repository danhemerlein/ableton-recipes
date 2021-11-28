import { addDoc, collection, doc, serverTimestamp } from '@firebase/firestore';
import _ from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import AuthCheck from '../../components/AuthCheck';
import Metatags from '../../components/Metatags';
import { UserContext } from '../../lib/context';
import {
  auth,
  firestore,
  getAllDocumentsInACollection,
} from '../../lib/firebase';

const TagsList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

const TagLitItem = styled.li`
  border: 1px solid black;
  padding: 10px;
  border-radius: 25%;
  display: inline;
  margin: 0 10px;
  width: 20%;
  display: flex;
  cursor: pointer;
`;

const TextInput = styled.input`
  margin: 20px 0px;
`;

const PublishedContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  width: 25%;
`;

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);

  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    setTags(statefulTags);
  }, []);

  // ensure slug is URL safe
  const slug = encodeURI(_.kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

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

  return (
    <form onSubmit={createPost}>
      <TextInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="post title"
      />

      <TextInput
        type="textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="post content"
      />

      <TagsList>
        {tags.map((tag) => {
          return (
            <>
              <TagLitItem>
                <label htmlFor={tag.id}>{tag.id}</label>
                <input type="checkbox" name="tags" id={tag.id} value={tag.id} />
              </TagLitItem>
            </>
          );
        })}
      </TagsList>

      <PublishedContainer>
        <label>publish now?</label>
        <input
          type="checkbox"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
      </PublishedContainer>

      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        create New Post
      </button>
    </form>
  );
}

const CreatePostForm = () => {
  return (
    <AuthCheck>
      <main>
        <Metatags title="creating a new post" />
        <CreateNewPost />
      </main>
    </AuthCheck>
  );
};

export default CreatePostForm;
