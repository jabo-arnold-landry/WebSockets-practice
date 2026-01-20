export const sendingUserData = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/ourblog/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("there was an error fetching data");
    let data = await response.json();
    return data.accessToken;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
