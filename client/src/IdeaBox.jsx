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
    setUserInput({});
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
          value={userInput.idea || ""}
          onChange={handleUserInput}
        ></textarea>
        <br />
        <button
          onClick={sendMessageToServer}
          disabled={userInput.idea ? false : true}
        >
          Post
        </button>
      </form>
    </>
  );
}

export default IdeaBox;
