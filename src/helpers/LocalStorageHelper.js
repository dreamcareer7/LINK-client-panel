export const AUTH_TOKEN = 'userToken';
export const USER_NAME = 'userName';

export const saveAuthTokenLocalStorage = ({ authToken }) => {
  localStorage.setItem(AUTH_TOKEN, authToken);
};

export const getAuthTokenLocalStorage = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER_NAME);
};
