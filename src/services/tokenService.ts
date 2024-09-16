const KEY_FOR_REFRESH_TOKEN = "refreshToken";
const KEY_FOR_ACCESS_TOKEN = "accessToken";

export const saveAccessToken = (value: string): void => {
  localStorage.setItem(KEY_FOR_ACCESS_TOKEN, value);
};
export const saveRefreshToken = (value: string): void => {
  localStorage.setItem(KEY_FOR_REFRESH_TOKEN, value);
};
export const deteleRefreshToken = (): void => {
  localStorage.removeItem(KEY_FOR_REFRESH_TOKEN);
};

export const deteleAccessToken = (): void => {
  localStorage.removeItem(KEY_FOR_ACCESS_TOKEN);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(KEY_FOR_ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(KEY_FOR_REFRESH_TOKEN);
};
export const saveAdminToken = (value: string): void => {
  localStorage.setItem(KEY_FOR_ACCESS_TOKEN, value);
};
