import axios from "axios";
const BASEURL =  "http://localhost:3000"
const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export const privateEndpoint = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api
