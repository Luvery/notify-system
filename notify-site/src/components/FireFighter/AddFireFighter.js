/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { Formik, Field, Form } from 'formik';
import { addFireFighter } from '../../utils/apiServices';

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
  left: 50px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  border-radius: 3px;
`;

const StyledField = styled(Field)`
  font-size: 18px;
  margin-top: 30px;
  display: block;
  width: 300px;
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

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const initialValues = {
  lastName: '',
  firstName: '',
  email: '',
  phoneNumber: '',
  fireDepartmentId: null,
};

class AddFireFighter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      //   fighterModel: [],
    };
  }

  async componentDidMount() {
    const localProps = this.props;
    // eslint-disable-next-line no-console
    console.log(localProps.departmentId);
  }

  FireFighterForm = () => (
    <div>
      <StyledHeading>Dodaj Strażaka</StyledHeading>
      <StyledWrapper>
        <Formik
          // eslint-disable-next-line react/destructuring-assignment
          initialValues={initialValues}
          onSubmit={async values => {
            // eslint-disable-next-line react/destructuring-assignment
            values.fireDepartmentId = this.props.departmentId;
            values.fireDepartmentId = parseInt(values.fireDepartmentId, 10);
            await addFireFighter(values);
            navigate(
              `/app/straz/edit/${this.props.departmentId}/firefighters/`
            );
          }}
        >
          {({ isSubmitting }) => (
            <StyledFormik>
              <div className="col">
                <div className="row">
                  <StyledField name="lastName" type="text" required />
                  <StyledLabel>Nazwisko</StyledLabel>
                </div>
                <div className="row">
                  <StyledField name="firstName" type="text" required />
                  <StyledLabel>Imię</StyledLabel>
                </div>
                <div className="row">
                  <StyledField name="email" type="text" required />
                  <StyledLabel>Email</StyledLabel>
                </div>
                <div className="row">
                  <StyledField name="phoneNumber" type="text" required />
                  <StyledLabel>Nr telefonu</StyledLabel>
                </div>
                <StyledButton type="submit" disabled={isSubmitting}>
                  {' '}
                  Stwórz
                </StyledButton>
                <h1 hidden={!isSubmitting}>Submituje</h1>
              </div>
            </StyledFormik>
          )}
        </Formik>
      </StyledWrapper>
    </div>
  );

  render() {
    return <>{this.FireFighterForm()}</>;
  }
}
export default AddFireFighter;
