import { useContext } from "react";
import { sendingUserData } from "../api/authanticationsEndpoint";
import { AuthContext } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useFormStatus } from "react-dom";

function Login() {
  const { setUser } = useContext(AuthContext);
  let location = useNavigate();

  async function redirectAndAssignToken(formData) {
    const userData = Object.fromEntries(formData);

    if (userData.name == "" || userData.password == "")
      return alert("all input field(s) are required fill them to continue");
    const accessToken = await sendingUserData(userData);

    if (!accessToken) return alert("unable to fetch Data");

    setUser(accessToken);
    location("/", { replace: true });
  }

  return (
    <>
      <h1>Creat accound</h1>
      <form action={redirectAndAssignToken}>
        <div className="input-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email goes here"
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
          />
          <br />
        </div>
        <SubmitBtn />
      </form>
    </>
  );
}

function SubmitBtn() {
  const data = useFormStatus();
  let isLoading = data.pending;
  return (
    <button disabled={isLoading}>{isLoading ? "sending..." : "Create"}</button>
  );
}

export default Login;
