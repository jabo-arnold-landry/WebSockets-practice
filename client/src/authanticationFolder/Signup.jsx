import React from "react";

function Signup() {
  return (
    <>
      <h1>Creat accound</h1>
      <form action="">
        <div className="input-group">
          <label htmlFor="email">email</label>
          <input type="text" id="email" placeholder="email goes here" />
          <br />
        </div>
        <div className="input-group">
          <label htmlFor="password">password</label>
          <input type="password" id="password" placeholder="***" />
          <br />
        </div>
        <button>Create</button>
      </form>
    </>
  );
}

export default Signup;
