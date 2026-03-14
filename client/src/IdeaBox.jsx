import { useActionState } from "react";
import socket from "./socketsFolder/socket";
import useAuthHook from "./hooks/useAuthHook";

function IdeaBox() {
  const [_, action, isLoading] = useActionState(sendMessageToServer, "none");
  const { userData } = useAuthHook();

  function sendMessageToServer(_, formData) {
    const idea = formData.get("idea");
    const msg = { postOwnerID: userData.id, idea };
    socket.emit("fromClient", msg);
  }

  return (
    <>
      <form action={action} method="post">
        <textarea
          name="idea"
          id="idea"
          placeholder="your thoughts goes here...."
          cols="30"
          rows="4"
        ></textarea>
        <br />
        <button onClick={sendMessageToServer} disabled={isLoading}>
          {isLoading ? "Posting..." : "post"}
        </button>
      </form>
    </>
  );
}

export default IdeaBox;
