import AuthCheck from '@components/AuthCheck';
import DisabledLikeButton from '@components/DisabledLikeButton';
import LikeButton from '@components/LikeButton';
import { doc, onSnapshot } from '@firebase/firestore';
import { firestore } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import { H2, P } from 'styles/elements/typography';
import { anchorColor } from 'styles/utilities';
import { buildDate } from './lib';
import { UnorderedList } from './UnorderedList';

const Card = styled.li`
  width: 100%;

  border: ${({ theme }) => theme.border};
  padding: ${remHelper[8]};

  margin-bottom: ${remHelper[8]};
`;

const StyledP = styled(P)`
  margin: ${remHelper[8]} 0;

  a {
    ${({ theme, mode }) => {
      return anchorColor({
        color: theme.link[mode].color,
        textDecoration: 'none',
      });
    }}
  }
`;

const Title = styled(H2)`
  margin: ${remHelper[8]} 0;
  display: flex;
  justify-content: space-between;

  a {
    ${({ theme, mode }) => {
      return anchorColor({
        color: theme.link[mode].color,
        textDecoration: 'none',
      });
    }}
  }
`;

export function PostCard({ post, authors }) {
  const { heartCount, createdAt, link, title, id, tags, genres, plugins } =
    post;

  const [UICreatedAt, setUICreatedAt] = useState({});
  const [UIHeartCount, setUIHeartCount] = useState(heartCount);

  const author = authors.filter((a) => a.id === post.author);

  const ig = link.includes('instagram');
  const yt = link.includes('youtube');

  let authorLink;

  if (ig) {
    authorLink = author[0].links.instagram;
  } else if (yt) {
    authorLink = author[0].links.youtube;
  }

  useEffect(async () => {
    setUICreatedAt(buildDate(new Date(createdAt)));

    const unsub = onSnapshot(doc(firestore, 'posts', id), (doc) => {
      setUIHeartCount(doc.data().heartCount);
    });
  }, []);

  return (
    <Card>
      <Title mode="primary">
        <a href={link} target="_blank">
          {title}
        </a>

        <StyledP as="span" mode="primary">
          added&nbsp;{UICreatedAt.month}&nbsp;{UICreatedAt.dayNumber}&nbsp;
          {UICreatedAt.year}
        </StyledP>
      </Title>

      <StyledP mode="primary">
        author:
        <a href={authorLink} target="_blank">
          &nbsp;{author.name}
        </a>
      </StyledP>

      {tags && <UnorderedList title="tags" data={tags} />}

      {plugins && <UnorderedList title="plugins" data={plugins} />}

      {genres && <UnorderedList title="genres" data={genres} />}

      <FlexContainer>
        <StyledP mode="primary">
          <span>🖤 {UIHeartCount || 0}</span>
        </StyledP>

        <AuthCheck fallback={<DisabledLikeButton />}>
          <LikeButton postID={id} />
        </AuthCheck>
      </FlexContainer>
    </Card>
  );
}
