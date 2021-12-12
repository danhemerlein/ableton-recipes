import { remHelper } from 'lib/utilities/remHelper';
import Link from 'next/link';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import LikeButton from '@components/LikeButton';
import { H2, P } from 'styles/elements/typography';
import { useEffect, useState } from 'react';
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
  display: flex;
  justify-content: space-between;
`;

export function PostCard({ post, admin }) {
  const [createdAt, setCreatedAt] = useState({});

  useEffect(() => {
    setCreatedAt(buildDate(new Date(post.createdAt)));
  }, []);

  return (
    <Card>
      {admin && <>{post.published ? <P>Live</P> : <P>Unpublished</P>}</>}

      <Title>
        <a href={post.link} target="_blank">
          {post.title}
        </a>

        <StyledP as="span">
          added&nbsp;{createdAt.month}&nbsp;{createdAt.dayNumber}&nbsp;
          {createdAt.year}
        </StyledP>
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

        <AuthCheck>
          <LikeButton postSlug={post.slug} />
        </AuthCheck>
      </FlexContainer>

      {admin && (
        <StyledP>
          <Link href={`/admin/${post.slug}`}>Edit</Link>
        </StyledP>
      )}
    </Card>
  );
}
