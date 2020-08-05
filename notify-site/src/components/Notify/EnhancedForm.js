/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { withFormik } from 'formik';
import MySelect from './MySelect';
import { sendMessage } from './Message';
import { getFireDepartments } from '../../utils/apiServices';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
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

const StyledInput = styled.textarea`
  resize: none;
  display: flex;
  justify-content: top;
  font-size: 18px;
  margin-top: 30px;
  width: 300px;
  height: 300px;
  border: none;
  border: 1px solid #757575;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledMySelect = styled(MySelect)`
  display: flex;
  margin: 5px;
  width: 300px;
`;

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    description: '',
    departmentOptions: [],
  }),
  handleSubmit: async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      departmentOptions: values.departmentOptions.value,
    };
    // const id = departments.find;
    const abc = await getFireDepartments();

    const isName = () => {
      let id = -1;
      for (let i = 0; i < abc.fireDepartmentsVm.length; i++) {
        if (
          abc.fireDepartmentsVm[i].fireDepartmentName ===
          payload.departmentOptions
        ) {
          id = abc.fireDepartmentsVm[i].id;
        }
      }
      return id;
    };
    const depId = isName();

    sendMessage(payload);
    setSubmitting(false);
    navigate(`app/notify/sentto/${depId}`);
  },
  displayName: 'MyForm',
});

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          id="description"
          placeholder="Podaj opis zdarzenia"
          type="text"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.description && touched.description && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>
            {errors.description}
          </div>
        )}

        <StyledMySelect
          value={values.departmentOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.departmentOptions}
          touched={touched.departmentOptions}
        />
        <StyledButton
          type="button"
          className="outline"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </StyledButton>
        <StyledButton type="submit" disabled={isSubmitting}>
          Wyślij
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

class TempName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hub: null,
      loading: true,
    };
  }

  componentDidMount = async () => {
    this.setState({
      hub: this.props.hub,
      loading: false,
    });
  };

  sendMessageTemp = async () => {
    await sendMessage(this.state);
  };

  render() {
    const form = this.state.loading ? <p>Loading</p> : <MyEnhancedForm />;
    return <>{form}</>;
  }
}
export default TempName;
