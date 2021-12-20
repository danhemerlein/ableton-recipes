import AuthCheck from 'components/AuthCheck';
import Metatags from 'components/Metatags';
import { getAllDocumentsInACollection, getPostBySlug } from 'lib/firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UpdatePostForm from './UpdatePostForm';

const AdminSlug = () => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
};

export default AdminSlug;

function PostManager() {
  const [post, setPost] = useState([]);
  const [postRef, setPostRef] = useState(null);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const [authors, setAuthors] = useState([]);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(async () => {
    const { postData, ref } = await getPostBySlug(slug);
    const statefulTags = await getAllDocumentsInACollection('tags');
    const statefulGenres = await getAllDocumentsInACollection('genres');
    const statefulPulgins = await getAllDocumentsInACollection('plugins');
    const statefulAuthors = await getAllDocumentsInACollection('authors');

    setPost(postData);
    setPostRef(ref);
    setTags(statefulTags);
    setAuthors(statefulAuthors);
    setGenres(statefulGenres);
    setPlugins(statefulPulgins);
  }, []);

  return (
    <main>
      <Metatags title={`editing ${slug}`} />

      {post.length && (
        <section>
          <UpdatePostForm
            postRef={postRef}
            defaultValues={post}
            tags={tags}
            genres={genres}
            plugins={plugins}
            authors={authors}
          />
        </section>
      )}
    </main>
  );
}
