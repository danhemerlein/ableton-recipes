import styled from 'styled-components';
import toast from 'react-hot-toast';
import { remHelper } from 'lib/utilities/remHelper';
import { rainy_hearts } from 'styles/utilities';

const StyledLink = styled.a`
  padding: ${remHelper[4]};

  color: ${({ theme, mode }) => theme.button[mode].background};
  background: ${({ theme, mode }) => theme.button[mode].disabled};
  border: ${({ theme, mode }) => theme.button[mode].border};

  font-size: ${remHelper[16]};
  margin-left: ${remHelper[8]};

  text-decoration: none;
  display: flex;
  align-items: center;

  ${rainy_hearts};
`;

const mouseEnter = () => {
  toast('create an account or log in to like posts', {
    duration: 2000,

    // Custom Icon
    icon: '🎧',
  });
};

const DisabledLikeButton = () => {
  return (
    <StyledLink
      onMouseEnter={mouseEnter}
      href="/enter"
      mode="primary"
      title="create an account or log in to like posts"
    >
      like
    </StyledLink>
  );
};
export default DisabledLikeButton;
