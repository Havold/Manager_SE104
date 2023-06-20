import { setLoginStatus } from "reducers/loginStatusReducer";
import { storeUser } from "reducers/userReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccessTokenFromRefreshToken,
  getCurrentUser,
  validateToken,
} from "services/auth";
import { axiosForManagerAPI } from "services/axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
} from "services/localStorage";

const AutoLogin = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const login = () => {
    let { isChecking, isLogin } = loginStatus;
    if (!isChecking) return;
    isChecking = false;
    console.log("auto login");
    console.log(getAccessToken(), getRefreshToken());
    if (validateToken(getRefreshToken())) {
      if (!validateToken(getAccessToken())) {
        console.log("get new access_token");
        getAccessTokenFromRefreshToken()
          .then((res) => {
            console.log("new token", getAccessToken());
            isLogin = true;
            getCurrentUser().then((res) => dispatch(storeUser(res.data.data)));
          })
          .catch((err) => {
            console.log("clear");
            isLogin = false;
            clearTokens();
          })
          .finally(() => dispatch(setLoginStatus({ isLogin, isChecking })));
        return;
      }
      console.log("use old access_token");
      axiosForManagerAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${getAccessToken()}`;
      getCurrentUser()
        .then((res) => {
          isLogin = true;
          dispatch(storeUser(res.data.data));
        })
        .catch((err) => {
          isLogin = false;
          removeAccessToken();
          login();
          return;
        })
        .finally(() => dispatch(setLoginStatus({ isLogin, isChecking })));
      return;
    }
    console.log("login failed");
    clearTokens();
    dispatch(setLoginStatus({ isLogin, isChecking }));
  };
  useEffect(() => {
    login();
  }, [loginStatus]);
};

export default AutoLogin;
