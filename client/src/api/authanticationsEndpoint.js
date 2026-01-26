import api from "./axiosFile";

export const sendingUserData = async (userData) => {
  try {
    const response = await api.post("/ourblog/login", userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data.accessToken;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
