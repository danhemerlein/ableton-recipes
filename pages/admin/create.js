import AdminCheck from 'components/AdminCheck';
import Metatags from 'components/Metatags';
import { getAllDocumentsInACollection } from 'lib/firebase';
import { useEffect, useState } from 'react';
import CreatePostForm from './CreatePostForm';

function CreateNewPost() {
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    const statefulGenres = await getAllDocumentsInACollection('genres');
    const statefulPulgins = await getAllDocumentsInACollection('plugins');
    const statefulAuthors = await getAllDocumentsInACollection('authors');

    setTags(statefulTags);
    setAuthors(statefulAuthors);
    setGenres(statefulGenres);
    setPlugins(statefulPulgins);
  }, []);

  return (
    <CreatePostForm
      tags={tags}
      genres={genres}
      plugins={plugins}
      authors={authors}
    />
  );
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
