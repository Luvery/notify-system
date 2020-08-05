// eslint-disable-next-line import/no-cycle
import { authenticate } from './apiServices';

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('gatsbyUser')
    ? JSON.parse(window.localStorage.getItem('gatsbyUser'))
    : {};

const setUser = user =>
  window.localStorage.setItem('gatsbyUser', JSON.stringify(user));

export const handleLogin = async ({ username, password }) => {
  const userToken = await authenticate(username, password);
  // eslint-disable-next-line no-console
  console.log('userToken z handleLogin', userToken);

  if (userToken != null) {
    return setUser({
      username,
      token: userToken.token,
    });
  }
  return false;
};

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
};

export const logout = callback => {
  setUser({});
  callback();
};
