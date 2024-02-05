import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://ched-records-app.vercel.app:8081/",
  withCredentials: true,
});
// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8081/",
//   withCredentials: true,
// });