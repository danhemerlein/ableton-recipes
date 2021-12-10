import Link from 'next/link';
import { doc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, firestore, getPostByUserAndSlug } from 'lib/firebase';
import styled from 'styled-components';
import {
  getDesktopMarginLeft,
  getDestkopMarginRight,
  getTabletMarginLeft,
  getTabletMarginRight,
} from './lib';
import { P, H2 } from 'styles/elements/typography';
import { FlexContainer } from 'styles/elements/containers';
import { remHelper } from 'lib/utilities/remHelper';
import { above } from 'styles/utilities';

import LikeButton from 'components/LikeButton';

const Card = styled.li`
  width: 100%;

  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
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
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagForeground};
  padding: ${remHelper[4]};
  margin: 0 ${remHelper[8]};
  border-radius: 25%;
  display: inline;
`;

const TagsContainer = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
`;

const StyledP = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const Title = styled(H2)`
  margin: ${remHelper[8]} 0;
`;

export function PostCard({ post, admin }) {
  const [postRef, setPostRef] = useState(null);

  const { slug } = post;

  useEffect(async () => {
    const { refData } = await getPostByUserAndSlug(userRef, slug);

    setPostRef(refData);
  }, []);

  return (
    <Card>
      {admin && <>{post.published ? <P>Live</P> : <P>Unpublished</P>}</>}

      <Title>
        <a href={post.link} target="_blank">
          {post.title}
        </a>
      </Title>

      <StyledP>author: {post.author}</StyledP>

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
        <StyledP>
          <span>🖤 {post.heartCount || 0}</span>
        </StyledP>

        <LikeButton postDocRef={postRef} />
      </FlexContainer>

      {admin && (
        <StyledP>
          <Link href={`/admin/${post.slug}`}>Edit</Link>
        </StyledP>
      )}
    </Card>
  );
}
