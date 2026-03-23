import React, { useEffect, useState } from "react";
import newAccessToken from "../api/refreshToken";

import { Outlet } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";

function PersistLogin() {
  const { user, setUser } = useAuthHook()
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
