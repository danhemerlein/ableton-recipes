import { getAllDocumentsInACollection } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { above } from 'styles/utilities';
import { PostCard } from './PostCard';

const Feed = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: ${remHelper[16]};

  ${above.desktop`
    grid-template-columns: repeat(3, 1fr)
  `}

  margin-top: ${remHelper[16]};
  width: 100%;
`;

const PostFeed = ({ posts }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(async () => {
    const statefulAuthors = await getAllDocumentsInACollection('authors');

    setAuthors(statefulAuthors);
  }, []);

  if (!posts || !authors.length) {
    return null;
  }

  return (
    <Feed>
      {posts.map((post) => {
        return <PostCard authors={authors} post={post} key={post.id} />;
      })}
    </Feed>
  );
};

export default PostFeed;
