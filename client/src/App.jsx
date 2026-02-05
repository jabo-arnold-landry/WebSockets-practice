import { useEffect, useState, useContext } from "react";
import axios from "axios";
import socket from "./socketsFolder/socket";
import IdeaBox from "./IdeaBox";
import CommentsFile from "./CommentsFile";
import Login from "./authanticationFolder/Login";
import { AuthContext } from "./contexts/useAuth";
import { NavLink, replace, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import useAxiosPrivate from "./api/useAxios";
import Testing from "./Testing";
import PersistLogin from "./LoginPersist/PersistLogin";
import NotFound from "./NotFound";

function App() {
  const fetching = useAxiosPrivate();
  const { user, setUserData } = useContext(AuthContext);
  // states initialization and declaration section
  const [toggleIdeaBox, setToggler] = useState(false);
  const [postedBlogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({}); // Store comments per post ID
  const [expandComment, setExpandComment] = useState(false);
  const navigate = useNavigate;

  // establishing the handshake with the backend for the io
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("liveData", (res) => {
      setBlogs(res);
    });

    socket.on("commented", (res) => {
      setBlogs(res);
    });
    if (!user) return;
    async function fetchOnLoad() {
      try {
        const response = await fetching.get("/currentTalk");
        setUserData(response.data.userDetails);
        setBlogs(response.data.response);
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

  function toggleOnAndOffIdeaBox() {
    setToggler((currvalue) => !currvalue);
  }

  function createComment(e) {
    const contentId = e.target.id;
    const comment = comments[contentId] || "";
    socket.emit("comment", { contentId, comment });
    // Clear only this specific comment
    setComments((prev) => ({ ...prev, [contentId]: "" }));
  }

  function handleCommentChange(postId, value) {
    setComments((prev) => ({ ...prev, [postId]: value }));
  }

  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={
                <>
                  <header>
                    <h1>Title</h1>
                    <button onClick={toggleOnAndOffIdeaBox}>Add +</button>
                    {toggleIdeaBox && (
                      <div>
                        <IdeaBox kind={setToggler} />
                      </div>
                    )}
                  </header>

                  <main>
                    {postedBlogs.length ? (
                      postedBlogs.map((element) => {
                        const { postContents, postID } = element;
                        return (
                          <div key={postID}>
                            <div id="idea-box">
                              <p title={postContents}>{postContents}</p>
                              <button title="expand comments" id={postID}>
                                +
                              </button>
                            </div>
                            {element["comments"].length ? (
                              <CommentsFile
                                comments={element["comments"]}
                              ></CommentsFile>
                            ) : (
                              <p>This post has no comment</p>
                            )}
                            <input
                              type="text"
                              placeholder="you comment goes here"
                              value={comments[postID] || ""}
                              onChange={(e) =>
                                handleCommentChange(postID, e.target.value)
                              }
                            />

                            <div id="controls">
                              <button
                                disabled={comments[postID] ? false : true}
                                title="comment"
                                id={postID}
                                onClick={createComment}
                              >
                                comment
                              </button>
                              <button title="like what you see">like</button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <strong>No Data</strong>
                    )}
                  </main>
                  <NavLink to="/test">Test</NavLink>
                </>
              }
            />
            <Route path="/test" element={<Testing />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
