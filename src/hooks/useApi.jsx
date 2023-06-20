import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "reducers/loginStatusReducer";
import { getAccessTokenFromRefreshToken } from "services/auth";
import { axiosForManagerAPI } from "services/axios";
import { toast } from "react-toastify";

const useAPI = ({ queryFn, getNow, fnParam, alert_error = true }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  function run(param) {
    setLoading(true);
    return queryFn(param)
      .then((res) => {
        setResponse(res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        if (err?.response?.status === 401 && loginStatus.isLogin) {
          const { method, url, data, params } = err.config;
          return getAccessTokenFromRefreshToken()
            .then((res) => {
              return axiosForManagerAPI
                .request({ method, url, data, params })
                .then((res) => {
                  setResponse(res);
                  return Promise.resolve(res);
                });
            })
            .catch((err2) => {
              dispatch(setLoginStatus({ ...loginStatus, isChecking: true }));
              setResponse(null);
              if (alert_error)
                toast.error(err?.response?.data.message || err.message);
              setError(err);
              return Promise.reject(err);
            });
        }
        setResponse(null);
        if (alert_error)
          toast.error(err?.response?.data.message || err.message);
        setError(err);
        return Promise.reject(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const runNow = async () => {
    try {
      if (getNow) run(fnParam);
    } catch (err) {}
  };
  useEffect(() => {
    if (getNow) runNow();
  }, []);
  return { response, run, loading, error };
};

export default useAPI;
