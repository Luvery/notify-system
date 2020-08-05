/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { Component } from 'react';
import styled from 'styled-components';
import { getHub } from './Message';

import {
  getFireDepartmentDetails,
  getFireFighter,
} from '../../utils/apiServices';
import { theme } from '../../assets/styles/theme';

const StyledInfo = styled.h3`
  margin: 40px;
  color: lightgray;
  font-weight: ${theme.font.regular};
`;
const StyledListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const StyledItem = styled.article`
  width: 20rem;
  margin: 15px;
  padding: 25px;
  color: white;
  background-color: lightgray;
  flex: 0 1 25%;
  border-radius: 3%;
  box-shadow: 10px 5px 5px gray;
  transition: 1s all ease;
`;
const StyledName = styled.h2`
  border-bottom: 1px solid gray;
`;

class SentTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hub: null,
      number: '',
      answer: '',
      response: {},
      departmentModel: [],
      loading: true,
      fighter: [],
      color: 'gray',
    };
    // this.setColor = this.setColor.bind(this);
  }

  async componentDidMount() {
    await this.getDepartment();
    this.setState(
      {
        hub: await getHub(),
      },
      () => {
        this.state.hub.on('onAnswer', async (number, answer) => {
          this.setState({ number, answer });
          await this.setColor();
        });
      }
    );
  }

  componentWillUnmount() {
    this.state.hub.stop();
  }

  setColor = id => {
    const fighters = this.state.departmentModel.fireFighters;
    let color = '';

    for (let i = 0; i < fighters.length; i++) {
      const fighter = fighters[i];
      if (
        id === fighter.id &&
        this.state.answer === 'TAK' &&
        this.state.number === fighter.phoneNumber
      ) {
        color = 'green';
      } else if (
        id === fighter.id &&
        this.state.answer === 'NIE' &&
        this.state.number === fighter.phoneNumber
      )
        color = 'red';
    }

    return color;
  };

  getDepartment = async () => {
    const localProps = this.props;
    const department = await getFireDepartmentDetails(localProps.departmentId);
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

  renderFireFighters = fighters => {
    if (!fighters.length) {
      return (
        <StyledInfo>
          Brak strażaków zapisanych do tej straży pożarnej
        </StyledInfo>
      );
    }
    return (
      <StyledListWrapper>
        {fighters.map(fighter => (
          <StyledItem
            key={fighter.id}
            style={{ backgroundColor: this.setColor(fighter.id) }}
          >
            <StyledName>
              {fighter.lastName} {fighter.firstName}
            </StyledName>
            <p>
              {fighter.email} <br />
              {fighter.phoneNumber}
            </p>
          </StyledItem>
        ))}
      </StyledListWrapper>
    );
  };

  render() {
    const newLocal = this.state;
    const fighters = newLocal.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {this.renderFireFighters(newLocal.departmentModel.fireFighters)}
      </div>
    );

    return (
      <div>
        <h2>Wysłano powiadomienie do: </h2>
        {fighters}
      </div>
    );
  }
}

export default SentTo;
