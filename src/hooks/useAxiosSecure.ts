import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
});

const useAxiosSecure = () => {
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = Cookies.get("accessToken");

        // ngrok warning bypass header
        config.headers["ngrok-skip-browser-warning"] = "true";

        // Auth token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
