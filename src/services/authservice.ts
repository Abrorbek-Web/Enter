import axios from "./axios-instance";
import { store } from "../store";
import { signOut } from "../slice/authSlice";

interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  phone_number?: string;
  password: string;
}

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`/login/`, {
      email,
      password,
    });

    return response.data;
  } catch (err: any) {
    console.log(err, "xxx");
    console.log(err.response?.status, "salom");
    throw err;
  }
};

export const register = async (user: User): Promise<any> => {
  try {
    const response = await axios.post(`/users/`, user);
    return response.data;
  } catch (err: any) {
    console.log(err, "Salom");

    throw err;
  }
};

export const logOut = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  const data = {
    refresh_token: refreshToken,
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(`/logout/`, data, {
      headers,
    });
    return response.data;
  } catch (err: any) {
    store.dispatch(signOut());
    console.log(err, "xxx");
    console.log(err.response?.status, "salom");
    throw err;
  }
};
