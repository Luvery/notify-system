import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { handleLogin, isLoggedIn } from '../../utils/auth';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 30px;
  width: 400px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  border-radius: 3px;
`;

const StyledInput = styled.input`
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
  margin-top: 10px;
  width: 30%;
  height: 40px;
  border-radius: 3px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  transition: 0.5s all ease;
  :hover {
    background-color: #16817a;
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ``,
      password: ``,
    };
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await handleLogin(this.state);
  };

  render() {
    if (isLoggedIn()) {
      navigate(`/`);
    }

    return (
      <StyledWrapper>
        <StyledForm
          method="post"
          onSubmit={async event => {
            await this.handleSubmit(event);
            navigate(`/`);
          }}
        >
          <h1>Zaloguj się:</h1>
          <p>admin@asd.com</p>
          <p>Pa$$w0rd!</p>
          <div className="col">
            <div className="row">
              <StyledInput
                id="username-input"
                type="text"
                name="username"
                onChange={this.handleUpdate}
                required
              />
              <StyledLabel htmlFor="username-input">Username</StyledLabel>
            </div>
            <div className="row">
              <StyledInput
                id="password-input"
                type="password"
                name="password"
                onChange={this.handleUpdate}
                required
              />
              <StyledLabel htmlFor="password-input">Password</StyledLabel>
            </div>
            <StyledButton type="submit"> Log In </StyledButton>
          </div>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

export default Login;
