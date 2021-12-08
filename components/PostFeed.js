import { PostCard } from './PostCard';
import styled from 'styled-components';

const Feed = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const PostFeed = ({ posts, admin }) => {
  if (!posts) {
    return null;
  }

  return (
    <Feed>
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} admin={admin} />
      ))}
    </Feed>
  );
};

export default PostFeed;
