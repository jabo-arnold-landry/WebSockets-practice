import { useEffect, useState } from "react";
import socket from "./socketsFolder/socket";
import IdeaBox from "./IdeaBox";
function App() {
  const [toggleIdeaBox, setToggler] = useState(true);

  // establishing the handshake with the backend for the io
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
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
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Exercitationem nam dolorem, commodi debitis quis harum cupiditate
          laboriosam necessitatibus rerum similique quibusdam vero dignissimos
          numquam ea? Quaerat repellat porro nemo alias, praesentium officiis
          blanditiis. Excepturi placeat ullam nihil quos! Veritatis, labore.
        </p>
        <div className="controls">
          <button>comment</button>
          <button>like</button>
        </div>
      </main>
    </>
  );
}

export default App;
