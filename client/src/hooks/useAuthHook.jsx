import { useContext } from "react";
import { AuthContext } from "../contexts/useAuth";

function useAuthHook() {
  const { user, setUser, setUserData, userData } = useContext(AuthContext);
  return { user, setUser, userData, setUserData };
}

export default useAuthHook;
