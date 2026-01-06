import { useState, useEffect } from "react";
import socket from "./socketsFolder/socket";

function IdeaBox() {
  let [userInput, setUserInput] = useState({});

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput((currData) => ({ ...currData, [name]: value }));
  }
  function sendMessageToServer(e) {
    e.preventDefault();
    socket.emit("fromClient", userInput);
    
  }
  return (
    <>
      <form action="">
        <textarea
          name="idea"
          id="idea"
          placeholder="your thoughts goes here...."
          cols="30"
          rows="4"
          onChange={handleUserInput}
        ></textarea>
        <br />
        <button onClick={sendMessageToServer}>Post</button>
      </form>
    </>
  );
}

export default IdeaBox;
