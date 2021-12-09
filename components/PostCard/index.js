import Link from 'next/link';
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

      <H2>{post.title}</H2>

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

      <P>
        <span>🖤 {post.heartCount || 0}</span>
      </P>

      {admin && <Link href={`/admin/${post.slug}`}>Edit</Link>}
    </Card>
  );
}
