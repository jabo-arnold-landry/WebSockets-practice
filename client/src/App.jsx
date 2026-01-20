import { useEffect, useState } from "react";
import socket from "./socketsFolder/socket";
import IdeaBox from "./IdeaBox";
import CommentsFile from "./CommentsFile";
import Login from "./authanticationFolder/Login";
function App() {
  // states initialization and declaration section
  const [toggleIdeaBox, setToggler] = useState(false);
  const [postedBlogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({}); // Store comments per post ID
  const [expandComment, setExpandComment] = useState(false);

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
    async function fetchOnLoad() {
      try {
        const response = await fetch("http://localhost:3000/currentTalk");
        const ideas = await response.json();
        setBlogs(ideas);
      } catch (err) {
        console.log("we could not communicate with the server : ", err);
      }
    }
    fetchOnLoad();

    return () => {
      socket.off("connect");
      socket.off("liveData");
      socket.off("commented");
    };
  }, []);

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
          postedBlogs.map((element, index) => {
            const { idea, id } = element;
            return (
              <div key={index}>
                <div id="idea-box">
                  <p title={idea}>{idea}</p>
                  <button title="expand comments" id={id}>
                    +
                  </button>
                </div>
                {element["comments"].length ? (
                  <CommentsFile comments={element["comments"]}></CommentsFile>
                ) : (
                  <p>This post has no comment</p>
                )}
                <input
                  type="text"
                  placeholder="you comment goes here"
                  value={comments[id] || ""}
                  onChange={(e) => handleCommentChange(id, e.target.value)}
                />

                <div id="controls">
                  <button
                    disabled={comments[id] ? false : true}
                    title="comment"
                    id={id}
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

      <Login />
    </>
  );
}

export default App;
