import React, { Component } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { getFireDepartments } from '../../utils/apiServices';
import { colors } from '../../utils/colors';
import { isLoggedIn } from '../../utils/auth';

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
  border-radius: 6px;
  box-shadow: 10px 5px 5px gray;
  transition: 1s all ease;
  @media (max-width: 600px) {
    flex: 1 1 55%;
    width: 414px;
  }

  :hover {
    transform: translateY(-10px);
    background-color: #00cec9;
    cursor: pointer;
  }
`;

const StyledHeading = styled.h1`
  margin-left: 30px;
`;

const StyledAddButton = styled.button`
  background: ${colors.green};
  display: flex;
  color: white;
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  border: 1px solid ${colors.greenDark};
  border-radius: 10%;
  text-transform: uppercase;
  overflow: hidden;
  transition: 1s all ease;
  :hover {
    transform: scale(1.1);
    background-color: ${colors.addButton};
    cursor: pointer;
  }
`;

const StyledName = styled.h2`
  border-bottom: 1px solid gray;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
  @media (max-width: 600px) {
    margin-right: 10px;
  }
`;

class DepartmentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentsList: [],
      loading: true,
    };
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  async componentDidMount() {
    await this.getDepartments();
  }

  getDepartments = async () => {
    const departments = await getFireDepartments();
    if (departments === null) {
      this.setState({
        departmentsList: departments,
      });
    } else {
      this.setState({
        departmentsList: departments,
        loading: false,
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  handleClickEdit(id) {
    // e.preventDefault();
    navigate(`app/straz/edit/${id}`);
  }

  // eslint-disable-next-line class-methods-use-this
  renderDepartments(departments) {
    return (
      <StyledListWrapper>
        {departments.map(department => (
          <StyledItem
            key={department.id}
            onClick={() => this.handleClickEdit(department.id)}
          >
            <StyledName>{department.fireDepartmentName}</StyledName>
            <p>
              {department.city}, {department.street}
              {} {department.streetNumber} <br /> {department.zipCode}
            </p>
          </StyledItem>
        ))}
      </StyledListWrapper>
    );
  }

  render() {
    const newLocal = this.state;
    const departments = newLocal.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {this.renderDepartments(newLocal.departmentsList.fireDepartmentsVm)}
      </div>
    );
    const addButton = isLoggedIn() ? (
      <StyledAddButton>Dodaj</StyledAddButton>
    ) : (
      ' '
    );
    return (
      <>
        <StyledTitle>
          <StyledHeading>Lista Straży Pożarnych</StyledHeading>
          {addButton}
        </StyledTitle>
        {departments}
      </>
    );
  }
}
export default DepartmentsList;
