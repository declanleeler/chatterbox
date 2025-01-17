// src/utils/auth.ts

export const getAuthToken = (): string | null => {
  return localStorage.getItem('githubAccessToken');
};

export const setAuthToken = (accessToken: string, expiresIn: number) => {
  const expirationTime = new Date().getTime() + expiresIn * 1000; // Expires in seconds
  localStorage.setItem('githubAccessToken', accessToken);
  localStorage.setItem('githubTokenExpiration', expirationTime.toString());
};

export const isTokenExpired = (): boolean => {
  const expirationTime = localStorage.getItem('githubTokenExpiration');
  return expirationTime ? new Date().getTime() > Number(expirationTime) : true;
};

export const logout = (): void => {
  localStorage.removeItem('githubAccessToken');
  localStorage.removeItem('githubTokenExpiration');
  window.location.href = '/login'; // Redirect to the login page
};
