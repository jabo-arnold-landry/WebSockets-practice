import axios from "axios";

export default async function newAccessToken() {
  const response = await axios.get("http://localhost:3000/newaccesToken", {
    withCredentials: true,
  });
  return response.data;
}
