import { useEffect, useState } from "react";
import socket from "./socketsFolder/socket";
import IdeaBox from "./IdeaBox";
function App() {
  const [toggleIdeaBox, setToggler] = useState(true);
  const [postedBlogs, setBlogs] = useState([]);
  // establishing the handshake with the backend for the io
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("liveData", (res) => {
      setBlogs(res);
    });
  }, []);

  function toggleOnAndOffIdeaBox(e) {
    setToggler((currvalue) => !currvalue);
  }

  return (
    <>
      <header>
        <h1>Title</h1>
        <button onClick={toggleOnAndOffIdeaBox}>Add +</button>
        {toggleIdeaBox && (
          <div>
            <IdeaBox />
          </div>
        )}
      </header>

      <main>
        {postedBlogs.length ? (
          postedBlogs.map((element, index) => {
            const { idea } = element;
            console.log(element);
            return (
              <div key={index}>
                <p>{idea}</p>
                <div className="controls">
                  <button>comment</button>
                  <button>like</button>
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
