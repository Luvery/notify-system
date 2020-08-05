import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { isLoggedIn } from '../utils/auth';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import DepartmentIcon from '../assets/images/fire-truck.svg';
import SmartphoneIcon from '../assets/images/smartphone.svg';

const pageContent = {
  hello: {
    heading: 'Zarządzaj lub Wyślij powiadomienie Straży Pożarnej',
    paragraph: 'Hello from Earth',
  },
};

const StyledHeading = styled.h1`
  font-size: ${({ theme }) => theme.font.size.m};
`;
const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.font.size.m};
`;
const StyledSectionsWrapper = styled.div`
  padding-bottom: 200px;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledDepartmentIcon = styled(DepartmentIcon)`
  display: flex;
  height: 150px;
  width: 150px;
  margin: 30px;
  border-radius: 75px;
  box-shadow: 3px 4px 4px gray;
  transition: 0.5s all ease-in-out;
  :hover {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    height: 100px;
    width: 100px;
  }
`;
const StyledSmartphoneIcon = styled(SmartphoneIcon)`
  display: flex;
  margin: 30px;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  box-shadow: 3px 4px 4px gray;
  transition: 0.5s all ease-in-out;
  :hover {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    height: 100px;
    width: 100px;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IndexPage = () => (
  <StyledSectionsWrapper>
    <MainTemplate>
      <StyledHeading>{pageContent.hello.heading}</StyledHeading>
      {isLoggedIn() ? (
        <StyledIconWrapper>
          <Link to="/app/straz">
            <StyledDepartmentIcon />
          </Link>
          <Link to="/app/notify">
            <StyledSmartphoneIcon />
          </Link>
        </StyledIconWrapper>
      ) : (
        <StyledParagraph>
          <Link to="app/login">Zaloguj się</Link>, aby rozpocząć!
        </StyledParagraph>
      )}
    </MainTemplate>
  </StyledSectionsWrapper>
);

export default IndexPage;
