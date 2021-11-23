import Link from 'next/link';

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
