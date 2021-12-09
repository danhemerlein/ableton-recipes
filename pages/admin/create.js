import { useEffect, useState } from 'react';
import AdminCheck from '../../components/AdminCheck';
import Metatags from '../../components/Metatags';

import { getAllDocumentsInACollection } from '../../lib/firebase';
import CreatePostForm from './CreatePostForm';

function CreateNewPost() {
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    const statefulAuthors = await getAllDocumentsInACollection('authors');

    setTags(statefulTags);
    setAuthors(statefulAuthors);
  }, []);

  return <CreatePostForm tags={tags} authors={authors} />;
}

const CreatePost = () => {
  return (
    <AdminCheck>
      <main>
        <Metatags title="creating a new post" />
        <CreateNewPost />
      </main>
    </AdminCheck>
  );
};

export default CreatePost;
