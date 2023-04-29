import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivate } from "../Api/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const presRequest = err?.config;
        if (err?.response?.status === 401 && !presRequest?.sent) {
          presRequest.sent = true;
          const newAccessToken = await refresh();
          presRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(presRequest);
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
