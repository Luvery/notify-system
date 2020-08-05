import React from 'react';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import { getUser, isLoggedIn, logout } from '../../utils/auth';

const Wrapper = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
  padding-right: 35px;
  @media (max-width: 600px) {
    display: none;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  letter-spacing: 0.03em;
`;
export default () => {
  let greetingMessage = '';
  if (isLoggedIn()) {
    greetingMessage = `Witaj ${getUser().username}`;
  } else {
    greetingMessage = 'Jesteś niezalogowany';
  }
  return (
    <div>
      <Wrapper>
        <StyledLink to="/">HOME</StyledLink>
        {` `}
        <StyledLink to="/app/straz">STRAŻ POŻARNA</StyledLink>
        {` `}
        {isLoggedIn() ? (
          <StyledLink
            href="/"
            onClick={event => {
              event.preventDefault();
              logout(() => navigate(`/app/login`));
            }}
          >
            WYLOGUJ SIĘ
          </StyledLink>
        ) : null}
        <StyledLink>{greetingMessage}</StyledLink>
      </Wrapper>
    </div>
  );
};
