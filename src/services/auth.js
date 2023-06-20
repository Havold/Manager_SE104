import { axiosForManagerAPI } from "./axios";
import { clearTokens, getRefreshToken } from "./localStorage";
import { saveAccessToken, saveRefreshToken } from "./localStorage";
import jwt_decode from "jwt-decode";

const AUTHENTICATION_URLS = {
  LOGIN: "/v1/manager/login",
  LOGOUT: "/v1/manager/current/logout",
  REFRESH_TOKEN: "/v1/student/refresh_token",
};
export const register = (payload) => {
  return axiosForManagerAPI.request({
    method: "post",
    url: AUTHENTICATION_URLS.REGISTER,
    data: payload,
  });
};
export const login = async (payload) => {
  return await axiosForManagerAPI
    .request({
      method: "post",
      url: AUTHENTICATION_URLS.LOGIN,
      data: payload,
    })
    .then((response) => {
      axiosForManagerAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.access_token}`;
      saveRefreshToken(response.data.data.refresh_token);
      saveAccessToken(response.data.data.access_token);
      return response.data;
    });
};
export const logout = async () => {
  return await axiosForManagerAPI.delete(AUTHENTICATION_URLS.LOGOUT);
};
export const getCurrentUser = async () => {
  return await axiosForManagerAPI
    .request({ method: "get", url: "/v1/student/current" })
    .then((response) => {
      return Promise.resolve(response);
    });
};
export const validateToken = (token) => {
  if (token === null || token === undefined || token === "") {
    return false;
  }
  const decoded = jwt_decode(token);
  return Date.now() < decoded.exp * 1000;
};
export const getAccessTokenFromRefreshToken = () => {
  const refreshToken = getRefreshToken();
  if (!validateToken(refreshToken))
    return Promise.reject({ data: { error: "invalid_refresh_token" } });
  return axiosForManagerAPI
    .request({
      method: "post",
      url: AUTHENTICATION_URLS.REFRESH_TOKEN,
      data: { refresh_token: refreshToken },
    })
    .then((response) => {
      const access_token = response.data.data.access_token;
      if (access_token) {
        saveAccessToken(access_token);
        axiosForManagerAPI.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
      } else clearTokens();
      return Promise.resolve(response);
    });
};
