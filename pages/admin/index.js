import Button from '@components/Button';
import LinkButton from '@components/LinkButton';
import { deleteDoc } from '@firebase/firestore';
import AdminCheck from 'components/AdminCheck';
import Metatags from 'components/Metatags';
import { getAllDocumentsInACollection, getPostBySlug } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { H1, H2, P } from 'styles/elements/typography';
import { anchorColor, successToastStyles } from 'styles/utilities';

const StyledH2 = styled(H2)`
  margin: ${remHelper[8]} 0;

  a {
    ${({ theme, mode }) => {
      return anchorColor({
        color: theme.button[mode].color,
        textDecoration: 'underline',
        textDecorationHover: 'underline',
      });
    }}
  }
`;

const ListItem = styled.li`
  margin-top: ${remHelper[16]};
`;

const StyledLinkButton = styled(LinkButton)`
  margin-left: ${remHelper[16]};
`;

const StyledButton = styled(Button)`
  margin-left: ${remHelper[16]};
`;

const AdminPage = () => {
  return (
    <AdminCheck>
      <main>
        <Metatags title="admin page" />

        <H1 textAlign="center">admin panel</H1>

        <StyledH2 mode="primary">
          <Link href="/admin/create">create a new post</Link>
        </StyledH2>

        <StyledH2 mode="primary">manage posts: </StyledH2>

        <PostList />
      </main>
    </AdminCheck>
  );
};

export default AdminPage;

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPosts(await getAllDocumentsInACollection('posts'));
  }, []);

  const deletePost = async (event, slug) => {
    const { ref } = await getPostBySlug(slug);
    if (window.confirm('are you sure you want to delete this post?')) {
      await deleteDoc(ref);
      toast('post deleted successfully', successToastStyles);
    }
  };

  return (
    <ul>
      {posts.map((post) => {
        return (
          <ListItem>
            <P as="span">{post.title}</P>

            <StyledLinkButton
              mode="secondary"
              CTA="edit"
              HREF={`/admin/${post.slug}`}
            ></StyledLinkButton>

            <StyledButton
              mode="primary"
              CTA="delete"
              slug={post.slug}
              clickHandler={(e) => deletePost(e, post.slug)}
            ></StyledButton>
          </ListItem>
        );
      })}
    </ul>
  );
}
