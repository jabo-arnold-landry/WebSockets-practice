import { useEffect, useState, useContext } from "react";
import socket from "./socketsFolder/socket";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/useAuth";
import useAxiosPrivate from "./api/useAxios";
import IdeaCard from "./src/IdeaCard";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const fetching = useAxiosPrivate();
  const { user, setUserData } = useContext(AuthContext);

  // establishing the handshake with the backend for the io
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("liveData", (res) => {
      setPosts(res);
    });

    if (!user) return navigate("/login", { replace: true }); //limits the load previous function from executing

    // getting talked article while the user was offline
    async function fetchOnLoad() {
      try {
        const response = await fetching.get("/currentTalk");
        setUserData(response.data.userDetails);
        setPosts(response.data.response);
      } catch (err) {
        console.log("we could not communicate with the server : ", err);
        navigate("/login", { replace: true });
      }
    }

    fetchOnLoad();

    return () => {
      socket.off("connect");
      socket.off("liveData");
      socket.off("commented");
    };
  }, [user]);
  return (
    <>
      <Link to="/chat">chat</Link>
      <main>
        {posts.length ? (
          posts.map((element, index) => {
            return (
              <div key={index}>
                <IdeaCard key={index} {...element} />
              </div>
            );
          })
        ) : (
          <strong>No Data</strong>
        )}
      </main>
    </>
  );
}

export default PostPage;
