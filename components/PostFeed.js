import { PostCard } from './PostCard';

const PostFeed = ({ posts, admin }) => {
  return posts
    ? posts.map((post) => (
        <PostCard post={post} key={post.slug} admin={admin} />
      ))
    : null;
};

export default PostFeed;
