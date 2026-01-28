import React, { useEffect, useState } from "react";
import useAxiosPrivate from "./api/useAxios";
import { NavLink, replace, useNavigate } from "react-router-dom";

function Testing() {
  const [lists, setList] = useState([]);
  const fetching = useAxiosPrivate();
  const navigateBack = useNavigate();
  useEffect(() => {
    const getTalks = async () => {
      try {
        const response = await fetching.get("/list");
        setList(response.data || []);
      } catch (err) {
        console.log(err);
        navigateBack("/login", { replace: true });
      }
    };
    getTalks();
  }, []);
  return (
    <>
      {lists.map((list, index) => {
        const { idea } = list;
        return <h2 key={index}>{idea}</h2>;
      })}
      <NavLink to="/">Home</NavLink>
    </>
  );
}

export default Testing;
