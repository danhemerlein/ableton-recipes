import Link from 'next/link';
import styled from 'styled-components';

const TagsList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
`;

const Tag = styled.li`
  border: 1px solid black;
  padding: 10px;
  border-radius: 25%;
  display: inline;
  margin: 0;
`;

export function PostCard({ post, admin = false }) {
  return (
    <div className="card">
      {admin && (
        <>
          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <p>{post.content}</p>

      <p>tags:</p>
      <TagsList>
        {post.tags.map((tag) => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </TagsList>

      <span>💗 {post.heartCount || 0}</span>

      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>
        </>
      )}
    </div>
  );
}
