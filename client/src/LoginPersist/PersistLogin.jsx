import React, { useContext, useEffect, useState } from "react";
import newAccessToken from "../api/refreshToken";
import { AuthContext } from "../contexts/useAuth";
import { Outlet } from "react-router-dom";

function PersistLogin() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyRefresh = async () => {
      try {
        const accessToken = await newAccessToken();
        setUser(accessToken);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    !user ? verifyRefresh() : setLoading(false);
  }, []);

  return <>{loading ? <p>loading...</p> : <Outlet />}</>;
}

export default PersistLogin;
