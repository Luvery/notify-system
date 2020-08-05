/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { theme } from '../../assets/styles/theme';
import { getFireDepartmentDetails } from '../../utils/apiServices';
import { renderFireFighters } from '../FireFighter/RenderFighters';

const StyledHeading = styled.h1`
  margin-left: 30px;
  font-size: ${theme.font.size.m};
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  color: black;
  background-color: #f79071;
  font-weight: bold;
  width: 300px;
  height: 40px;
  border-radius: 3px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  transition: 0.5s all ease;
  :hover {
    background-color: #16817a;
  }
`;

const StyledDepartmentName = styled.h2`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: ${theme.font.size.l};
  font-weight: ${theme.font.regular};
  color: ${colors.orangeLight};
  text-decoration: none;
`;
const StyledDepartmentNameLink = styled(Link)`
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  width: 10%;
`;
const NameLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ManageDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentModel: [],
      loading: true,
    };
  }

  async componentDidMount() {
    await this.getDepartment();
  }

  getDepartment = async () => {
    const localProps = this.props;
    const department = await getFireDepartmentDetails(localProps.departmentId);
    // eslint-disable-next-line no-console
    console.log(department);
    if (department === null) {
      this.setState({
        departmentModel: department,
      });
    } else {
      this.setState({
        departmentModel: department,
        loading: false,
      });
    }
  };

  render() {
    const newLocal = this.state;
    const fighters = newLocal.loading ? (
      <p>Loading...</p>
    ) : (
      <div>{renderFireFighters(newLocal.departmentModel.fireFighters)}</div>
    );
    return (
      <>
        <StyledTitle>
          <StyledHeading>Strażacy zapisani do:</StyledHeading>
          <br />
          <StyledLink
            to={`/app/straz/edit/${this.props.departmentId}/firefighters/addfirefighter`}
          >
            Dodaj
          </StyledLink>
        </StyledTitle>
        <NameLinkWrapper>
          <StyledDepartmentNameLink
            to={`/app/straz/edit/${this.props.departmentId}`}
          >
            <StyledDepartmentName>
              {' '}
              {newLocal.departmentModel.fireDepartmentName}{' '}
            </StyledDepartmentName>
          </StyledDepartmentNameLink>
        </NameLinkWrapper>
        {fighters}
      </>
    );
  }
}

export default ManageDepartment;
