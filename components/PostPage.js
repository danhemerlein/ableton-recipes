import Link from 'next/link';

import AuthCheck from './AuthCheck';
import LikeButton from './LikeButton';
import { P, H1 } from 'styles/elements/typography';

const PostPage = ({ post, postDocumentRef }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <>
      <H1>{post?.title}</H1>

      <P>
        <span>created on {createdAt.toISOString()}</span>
      </P>

      <P>
        <span>🖤 {post.heartCount || 0}</span>
      </P>

      <AuthCheck>
        <LikeButton postDocumentRef={postDocumentRef}></LikeButton>
      </AuthCheck>
    </>
  );
};
export default PostPage;
