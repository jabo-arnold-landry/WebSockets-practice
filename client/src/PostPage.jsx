import { useEffect, useState, useContext } from "react";
import socket from "./socketsFolder/socket";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/useAuth";
import useAxiosPrivate from "./api/useAxios";

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
    <main>
      {posts.length ? (
        posts.map((element) => {
          const { postContents, postID } = element;
          return (
            <div key={postID}>
              <div id="idea-box">
                <p title={postContents}>{postContents}</p>
                <button title="expand comments" id={postID}>
                  +
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <strong>No Data</strong>
      )}
    </main>
  );
}

export default PostPage;
