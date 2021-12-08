import Link from 'next/link';
import styled from 'styled-components';
import { P, H2 } from 'styles/elements/typography';
import { FlexContainer } from 'styles/elements/containers';
import { remHelper } from 'lib/utilities/remHelper';

const Card = styled.li`
  width: 25%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
  padding: ${remHelper[8]};
`;

const TagsList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
`;

const Tag = styled(P)`
  border: 1px solid black;
  padding: ${remHelper[4]};
  border-radius: 25%;
  display: inline;
  margin: 0;
`;

const TagsContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
`;

export function PostCard({ post, admin = false }) {
  return (
    <Card>
      {admin && <>{post.published ? <P>Live</P> : <P>Unpublished</P>}</>}

      <Link href={`/${post.username}/${post.slug}`}>
        <H2>{post.title}</H2>
      </Link>

      <TagsContainer>
        <P>tags:</P>
        <TagsList>
          {post.tags.map((tag) => {
            return (
              <Tag as="li" key={tag}>
                {tag}
              </Tag>
            );
          })}
        </TagsList>
      </TagsContainer>

      <span>💗 {post.heartCount || 0}</span>

      {admin && <Link href={`/admin/${post.slug}`}>Edit</Link>}
    </Card>
  );
}
