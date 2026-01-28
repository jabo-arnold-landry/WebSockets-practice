import { useEffect } from "react";
import { AuthContext } from "../contexts/useAuth";
import { useContext } from "react";
import newAccessToken from "./refreshToken";
import { privateEndpoint } from "./defaultPoint";

const useAxiosPrivate = () => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const requestInterceptor = privateEndpoint.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = `Bearer ${user}`;
        return config;
      },
      (err) => Promise.reject(err),
    );
    const responseInterceptor = privateEndpoint.interceptors.response.use(
      (res) => res,
      async (err) => {
        const previousRequest = err?.config;
        if (err.response?.status === 401 && !previousRequest?.sent) {
          previousRequest.sent = true;
          const accessToken = await newAccessToken();
          setUser(accessToken);
          previousRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return privateEndpoint(previousRequest);
        }
        return Promise.reject(err);
      },
    );
    return () => {
      privateEndpoint.interceptors.request.eject(requestInterceptor);
      privateEndpoint.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);
  
  return privateEndpoint;
};
export default useAxiosPrivate;
