import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://ched-records-app.vercel.app/",
  withCredentials: true,
});
// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8081/",
//   withCredentials: true,
// });