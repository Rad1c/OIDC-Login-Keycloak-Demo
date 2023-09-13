import axios from "axios";

const baseURL = "https://localhost:7258";

export default axios.create({ baseURL });

const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (err) => {
    const prevReq = err?.config;
    if (err?.response?.status === 401 && !prevReq?.sent) {
      prevReq.sent = true;

      const data = await refresh();
      const newAccessToken = "";

      console.log(data);

      prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosPrivate(prevReq);
    }

    throw err;
  }
);
