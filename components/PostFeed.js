import { PostCard } from './PostCard';
import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';

const Feed = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: ${remHelper[16]};
`;

const PostFeed = ({ posts, admin }) => {
  if (!posts) {
    return null;
  }

  return (
    <Feed>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} admin={admin} />
      ))}
    </Feed>
  );
};

export default PostFeed;
