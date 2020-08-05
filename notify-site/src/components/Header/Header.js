import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import NavBar from '../Nav/nav-bar';

const HeaderTitleStyled = styled.h1`
  margin-left: 35px;
  font-size: 36px;
  font-weight: 600;
`;
const HeaderStyled = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.orange};
`;

const Header = () => {
  return (
    <HeaderStyled>
      <HeaderTitleStyled>Notify System</HeaderTitleStyled>
      <NavBar />
    </HeaderStyled>
  );
};
export default Header;
