// eslint-disable-next-line import/no-cycle
import { getUser } from './auth';

export function authHeader() {
  const currentUser = getUser();
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
}
export default authHeader;
