/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select/async';
import { getFireDepartments } from '../../utils/apiServices';

const StyledSelect = styled(Select)`
  display: block;
  width: 30rem;
  margin: 1em;
`;

class MySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentOptions: [],
    };
  }

  async componentDidMount() {
    await this.getDepartments();
  }

  getDepartments = async () => {
    const departments = await getFireDepartments();
    const optionsList = await this.setOptions(departments.fireDepartmentsVm);
    if (departments === null) {
      this.setState({
        departmentOptions: optionsList,
      });
    } else {
      this.setState({
        departmentOptions: optionsList,
      });
    }
  };

  setOptions = async departments => {
    const departmentNames = departments.map(
      department => department.fireDepartmentName
    );
    const departmentOptions = [];
    for (let i = 0; i < departmentNames.length; i++) {
      departmentOptions[i] = {
        value: departmentNames[i],
        label: departmentNames[i],
      };
    }
    return departmentOptions;
  };

  filterDepartments = inputValue => {
    const departmentsTEST = this.state.departmentOptions;
    return departmentsTEST.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(this.filterDepartments(inputValue));
    });

  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('departmentOptions', value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('departmentOptions', true);
  };

  render() {
    return (
      <div>
        <label htmlFor="name">Wybierz Straż Pożarną </label>
        <StyledSelect
          id="name"
          defaultOptions={this.state.departmentOptions}
          loadOptions={this.promiseOptions}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

export default MySelect;
