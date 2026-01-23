export default async function newAccessToken() {
  const response = await fetch("http://localhost:3000/newaccesToken", {
    method: "GET",
    credentials: "include",
  });
  const newToken = await response.json();
  return newToken;
}
