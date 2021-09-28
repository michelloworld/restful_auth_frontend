import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../actions/UserAction";

const axiosApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    if (process.browser) {
      const {
        user: { accessToken },
      } = store.getState();

      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const resp = await axiosApiInstance.post(
          `${process.env.NEXT_PUBLIC_URL}/api/refresh_token`
        );

        const {
          data: {
            data: { accessToken },
          },
        } = resp;

        await store.dispatch(setAccessToken(accessToken));

        axiosApiInstance.defaults.headers.setCookie = resp.headers["set-cookie"];
        axiosApiInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      } catch (e) {
        console.log(`[ERROR] - ${e}`);
      }
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
