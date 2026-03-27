import { createContext, useState } from "react";

export const ActiveUsers = createContext();

const ShowActiveUsers = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  return (
    <>
      <ActiveUsers.Provider value={{ activeUsers, setActiveUsers }}>
        {children}
      </ActiveUsers.Provider>
    </>
  );
};




export default ShowActiveUsers;
