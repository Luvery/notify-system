import React from 'react';
import styled from 'styled-components';
import { theme } from '../../assets/styles/theme';
import { colors } from '../../utils/colors';

const StyledInfo = styled.h3`
  margin: 40px;
  color: lightgray;
  font-weight: ${theme.font.regular};
`;
const StyledListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const StyledItem = styled.article`
  margin: 15px;
  padding: 25px;
  color: white;
  background-color: ${colors.green};
  flex: 0 1 25%;
  border-radius: 3%;
  box-shadow: 10px 5px 5px gray;
  transition: 1s all ease;
  :hover {
    transform: translateY(-20px);
    background-color: #00cec9;
    cursor: pointer;
  }
`;
const StyledName = styled.h2`
  border-bottom: 1px solid gray;
`;

export const renderFireFighters = fighters => {
  if (!fighters.length) {
    return (
      <StyledInfo>Brak strażaków zapisanych do tej straży pożarnej</StyledInfo>
    );
  }
  return (
    <StyledListWrapper>
      {fighters.map(fighter => (
        <StyledItem key={fighter.id}>
          <StyledName>
            {fighter.lastName} {fighter.firstName}
          </StyledName>
          <p>
            EMAIL: {fighter.email} <br />
            TEL: {fighter.phoneNumber}
          </p>
        </StyledItem>
      ))}
    </StyledListWrapper>
  );
};
export default renderFireFighters;
