import api from "./defaultPoint";

export default async function newAccessToken() {
  const response = await api.get("http://localhost:3000/newaccesToken", {
    withCredentials: true,
  });
  return response.data;
}
