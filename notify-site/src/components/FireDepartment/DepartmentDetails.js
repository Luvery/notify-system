/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import { Link } from 'gatsby';
// import { Debug } from '../Debug';
import {
  getFireDepartmentDetails,
  updateFireDepartment,
} from '../../utils/apiServices';

const StyledHeading = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFormik = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 400px;
  margin: 30px;
  height: 100%;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  border-radius: 3px;
  @media (max-width: 600px) {
    width: 350px;
  }
`;

const StyledField = styled(Field)`
  font-size: 18px;
  margin-top: 30px;
  display: block;
  width: 300px;
  /* @media (max-width: 600px) {
    width: 150px;
  } */
  border: none;
  border-bottom: 1px solid #757575;
  :focus {
    outline: none;
  }
  :focus ~ label {
    top: -40px;
    font-size: 14px;
    color: #f79071;
  }
  :valid ~ label {
    top: -50px;
    font-size: 14px;
    color: #f79071;
  }
`;
const StyledLabel = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: relative;
  pointer-events: none;
  left: 5px;
  top: -30px;
  transition: 0.2s ease all;
`;

const StyledButton = styled.button`
  position: relative;
  border: none;
  background-color: #f79071;
  font-weight: bold;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  transition: 0.5s all ease;
  :hover {
    background-color: #16817a;
  }
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

class DepartmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentModel: [
        {
          id: '',
          fireDepartmentName: '',
          city: '',
          street: '',
          streetNumber: '',
          zipCode: '',
        },
      ],
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

  DepartmentDetails = () => (
    <div>
      <StyledHeading>Straż Pożarna</StyledHeading>

      <Formik
        // eslint-disable-next-line react/destructuring-assignment
        initialValues={this.state.departmentModel}
        onSubmit={async values => {
          await updateFireDepartment(values);
        }}
      >
        {({ isSubmitting }) => (
          <StyledFormik>
            <div className="col">
              <div className="row">
                <StyledField name="fireDepartmentName" type="text" required />
                <StyledLabel>Nazwa</StyledLabel>
              </div>
              <div className="row">
                <StyledField name="city" type="text" required />
                <StyledLabel>Miasto</StyledLabel>
              </div>
              <div className="row">
                <StyledField name="street" type="text" required />
                <StyledLabel>Ulica</StyledLabel>
              </div>
              <div className="row">
                <StyledField name="streetNumber" type="text" required />
                <StyledLabel>Nr</StyledLabel>
              </div>
              <div className="row">
                <StyledField name="zipCode" type="text" required />
                <StyledLabel>Kod Pocztowy</StyledLabel>
              </div>
              <StyledButton type="submit" disabled={isSubmitting}>
                {' '}
                Update
              </StyledButton>
              <h1 hidden={!isSubmitting}>Submituje</h1>
              {/* <Debug /> */}
              <StyledLink
                // eslint-disable-next-line react/destructuring-assignment
                to={`/app/straz/edit/${this.props.departmentId}/firefighters`}
              >
                Strażacy
              </StyledLink>
            </div>
          </StyledFormik>
        )}
      </Formik>
    </div>
  );

  render() {
    const newLocal = this.state;
    const department = newLocal.loading ? (
      <p>Loading...</p>
    ) : (
      <div>{this.DepartmentDetails()}</div>
    );
    return <>{department}</>;
  }
}
export default DepartmentDetails;
