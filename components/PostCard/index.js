import { remHelper } from 'lib/utilities/remHelper';
import Link from 'next/link';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import LikeButton from '@components/LikeButton';
import { H2, P } from 'styles/elements/typography';
import { anchorColor } from 'styles/utilities';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { firestore } from 'lib/firebase';
import { above } from 'styles/utilities';
import {
  getDesktopMarginLeft,
  getDestkopMarginRight,
  getTabletMarginLeft,
  getTabletMarginRight,
  buildDate,
} from './lib';
import AuthCheck from '@components/AuthCheck';

const Card = styled.li`
  width: 100%;

  border: ${({ theme }) => theme.border};
  padding: ${remHelper[8]};

  ${above.tablet`
    width: calc(50% - ${remHelper[8]});

    ${({ index }) =>
      String(index) && `margin-right: ${getTabletMarginRight(String(index))};`}
    ${({ index }) =>
      String(index) && `margin-left: ${getTabletMarginLeft(String(index))};`}
  `}

  ${above.desktop`
    width: calc(25% - ${remHelper.override(12)});
    ${({ index }) =>
      String(index) && `margin-right: ${getDestkopMarginRight(String(index))};`}
    ${({ index }) =>
      String(index) && `margin-left: ${getDesktopMarginLeft(String(index))};`}
  `};

  margin-bottom: ${remHelper[8]};
`;

const TagsList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
`;

const Tag = styled(P)`
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagForeground};
  padding: ${remHelper[4]};
  margin: 0 ${remHelper[8]};
  border-radius: 100%;
  display: inline;
`;

const TagsContainer = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
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

export function PostCard({ post, admin, authors }) {
  const [createdAt, setCreatedAt] = useState({});

  const author = authors.filter((a) => a.id === post.author);
  const ig = post.link.includes('instagram');
  const yt = post.link.includes('youtube');

  let authorLink;

  if (ig) {
    authorLink = author[0].links.instagram;
  } else if (yt) {
    authorLink = author[0].links.youtube;
  }

  const [UIHeartCount, setUIHeartCount] = useState(post.heartCount);

  useEffect(async () => {
    setCreatedAt(buildDate(new Date(post.createdAt)));

    const unsub = onSnapshot(doc(firestore, 'posts', post.id), (doc) => {
      setUIHeartCount(doc.data().heartCount);
    });
  }, []);

  return (
    <Card>
      {admin && <>{post.published ? <P>Live</P> : <P>Unpublished</P>}</>}

      <Title mode="primary">
        <a href={post.link} target="_blank">
          {post.title}
        </a>

        <StyledP as="span" mode="primary">
          added&nbsp;{createdAt.month}&nbsp;{createdAt.dayNumber}&nbsp;
          {createdAt.year}
        </StyledP>
      </Title>

      <StyledP mode="primary">
        author:
        <a href={authorLink} target="_blank">
          &nbsp;{post.author}
        </a>
      </StyledP>

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

      <FlexContainer>
        <StyledP mode="primary">
          <span>🖤 {UIHeartCount || 0}</span>
        </StyledP>

        <AuthCheck>
          <LikeButton postID={post.id} />
        </AuthCheck>
      </FlexContainer>

      {admin && (
        <StyledP mode="primary">
          <Link href={`/admin/${post.slug}`}>Edit</Link>
        </StyledP>
      )}
    </Card>
  );
}
