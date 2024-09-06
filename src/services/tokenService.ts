const KEY_FOR_REFRESH_TOKEN = "refreshToken";
const KEY_FOR_ACCESS_TOKEN = "accessToken";

export const saveAccessToken = (): void => {
  localStorage.setItem(
    KEY_FOR_ACCESS_TOKEN,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1NzkzMTU4LCJpYXQiOjE3MjU1MzM5NTgsImp0aSI6Ijk4NTk4YTc2MWNmOTQ5ZmZiOGI2YmNkNTJmMDVhOTg3IiwidXNlcl9pZCI6M30.tuNLVLswnRPf4nlBGcvhFAHVdptPnOzDdy06lBmyXkg"
  );
};

export const saveRefreshToken = (): void => {
  localStorage.setItem(
    KEY_FOR_REFRESH_TOKEN,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyODEyNTk1OCwiaWF0IjoxNzI1NTMzOTU4LCJqdGkiOiJhNDQ5ZTIzMDM2YzM0NGZjYWFiNzA0M2IyYTYyZWZlYSIsInVzZXJfaWQiOjN9.vHnMjbRKJy5SsYfwaMIwHCZipDwS1jz143CpLRfwxCQ"
  );
};

// export const saveAccessToken = (value: string): void => {
//   localStorage.setItem(KEY_FOR_ACCESS_TOKEN, value);
// };
// export const saveRefreshToken = (value: string): void => {
//   localStorage.setItem(KEY_FOR_REFRESH_TOKEN, value);
// };
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
