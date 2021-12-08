import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import AuthCheck from './AuthCheck';
import LikeButton from './LikeButton';

const PostContent = ({ post, postDocumentRef }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div>
      <h1>{post?.title}</h1>
      <span>
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a>@{post.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>

      <ReactMarkdown>{post?.content}</ReactMarkdown>

      <p>
        <strong>{post.heartCount || 0} 🤍</strong>
      </p>

      <AuthCheck>
        <LikeButton postDocumentRef={postDocumentRef}></LikeButton>
      </AuthCheck>
    </div>
  );
};
export default PostContent;
