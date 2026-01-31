import { createContext, useState } from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser, setUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
