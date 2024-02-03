import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.254.105:8081/",
  withCredentials: true,
});
// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8081/",
//   withCredentials: true,
// });