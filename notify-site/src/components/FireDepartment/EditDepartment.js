/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
// import { Welcome } from './DepartmentDetails';
import DepartmentDetails from './DepartmentDetails';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class DepartmentsList extends React.PureComponent {
  async componentDidMount() {
    const localProps = this.props;
    // eslint-disable-next-line no-console
    console.log(localProps.departmentId);
  }

  render() {
    const propsLocal = this.props;
    return (
      <StyledWrapper>
        <DepartmentDetails departmentId={propsLocal.departmentId} />
      </StyledWrapper>
    );
  }
}
export default DepartmentsList;
