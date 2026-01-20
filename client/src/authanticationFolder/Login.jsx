import React from "react";
import { useState } from "react";
import { sendingUserData } from "../AuthanticationAPI/login";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);

  function handleInputs(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <h1>Creat accound</h1>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const accessToken = await sendingUserData(userData);
          console.log(accessToken);
          if (!accessToken) return alert("unable to fetch Data");
          setToken(accessToken);
        }}
      >
        {/* {console.log(token)} */}
        <div className="input-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email goes here"
            value={userData.email}
            onChange={handleInputs}
          />
          <br />
        </div>
        <div className="input-group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="***"
            value={userData.password}
            onChange={handleInputs}
          />
          <br />
        </div>
        <button>Create</button>
      </form>
    </>
  );
}

export default Login;
