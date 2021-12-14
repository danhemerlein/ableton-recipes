import { PostCard } from './PostCard';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { remHelper } from 'lib/utilities/remHelper';
import { getAllDocumentsInACollection } from 'lib/firebase';

const Feed = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${remHelper[16]};
  width: 100%;
`;

const PostFeed = ({ posts, admin }) => {
  if (!posts) {
    return null;
  }

  const [authors, setAuthors] = useState([]);

  useEffect(async () => {
    const statefulAuthors = await getAllDocumentsInACollection('authors');
    setAuthors(statefulAuthors);
  }, []);

  return (
    <Feed>
      {posts.map((post) => {
        const author = authors.filter((author) => author.id === post.author);

        return (
          <PostCard author={author} post={post} key={post.id} admin={admin} />
        );
      })}
    </Feed>
  );
};

export default PostFeed;
