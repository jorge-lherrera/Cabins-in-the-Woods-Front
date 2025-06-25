import styled from "styled-components";

import { useSession } from "../../hooks/auth/useSession";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  flex-shrink: 0;
`;

function UserAvatar() {
  const { data: session } = useSession();

  const user = session?.user || session;

  const name = user?.name || "User";
  const avatar = user?.avatar || "default-user.jpg";

  return (
    <StyledUserAvatar>
      <Avatar src={avatar} alt={`Avatar of ${name}`} />
      <span>{name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
