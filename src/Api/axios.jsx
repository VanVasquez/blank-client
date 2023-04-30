import axios from "axios";

let BASE_URL;
if (process.env.NODE_ENV === "production")
  BASE_URL = "https://blank-server.vercel.app/api/v1";
else BASE_URL = "http://localhost:8080/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
