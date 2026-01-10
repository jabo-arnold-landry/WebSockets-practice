import { useEffect, useState } from "react";
import socket from "./socketsFolder/socket";
import IdeaBox from "./IdeaBox";
function App() {
  // states initialization and declaration section
  const [toggleIdeaBox, setToggler] = useState(false);
  const [postedBlogs, setBlogs] = useState([]);
  const [comment, setComment] = useState("");
  const [expandComment, setExpandComment] = useState(false);

  // establishing the handshake with the backend for the io
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("liveData", (res) => {
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
  }, []);

  function toggleOnAndOffIdeaBox() {
    setToggler((currvalue) => !currvalue);
  }

  function expnadAndCollapseCommentSection(e) {
    const id = e.target.id;
    const commentTotoggle = document.querySelector(`[data-id="${id}"]`);
    commentTotoggle.classList.toggle("activeOne");
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
            const { idea } = element;
            return (
              <div key={index}>
                <div id="idea-box">
                  <p title={idea}>{idea}</p>
                  <button
                    title="expand comments"
                    onClick={expnadAndCollapseCommentSection}
                    id={index}
                  >
                    +
                  </button>
                </div>

                <div id="comments" data-id={index}>
                  <p title="comment">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sunt odio reiciendis placeat ipsa maxime? Optio mollitia
                    minus quam obcaecati tempora.
                  </p>
                  <input
                    type="text"
                    placeholder="you comment goes here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div id="controls">
                  <button
                    disabled={comment ? false : true}
                    title="comment"
                    id={index}
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
    </>
  );
}

export default App;
