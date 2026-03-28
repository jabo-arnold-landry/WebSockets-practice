import { useEffect } from "react";
import { messageSocket } from "./socketsFolder/socket";
import { BASEURL } from "./api/defaultPoint";
import { useState } from "react";
import { useActionState } from "react";
import socket from "./socketsFolder/socket";

function MessageSection() {
  const [_, action, isPending] = useActionState(sendMessage, "");
  const [recipientId, setRecipientId] = useState();

  function sendMessage(_, formData) {
    const chat = formData.get("message");
    let obj = { recipientId, chat };

    messageSocket.emit("message", obj);
  }

  useEffect(() => {
    messageSocket.on("connect", () =>
      console.log("the message have been connected"),
    );
    messageSocket.connect();

    socket.on("allofus", (res) => {
      console.log(res);
    });

    return () => {
      messageSocket.off("message");
      messageSocket.off("connect");
      socket.off("allofus");
    };
  }, []);
  // console.log(recipientId);
  return (
    <div>
      <UserList setRecipientId={setRecipientId} />
      <section className="discussion-section">
        <p className="sender">sending love to you</p>
        <p className="receiver">Thanks</p>
      </section>
      {recipientId && (
        <section className="sending-section">
          <form action={action}>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="message goes here"
            />
            <button disabled={isPending}>
              {isPending ? " Sending..." : "Send"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

function UserList({ setRecipientId }) {
  const [users, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const userList = async () => {
      try {
        setIsLoading(true);
        const serverResponse = await fetch(`${BASEURL}/myusers`, {
          signal: abortController.signal,
        });
        const users = await serverResponse.json();
        setUserList(users);
      } catch (err) {
        console.log("something bad happened: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    userList();
  }, []);
  return (
    <>
      <p>{isLoading && "Loading users...."}</p>
      <ul>
        {users.map((user) => {
          const { id, names } = user;
          return (
            <li
              key={id}
              data-id={id}
              onClick={(e) => {
                setRecipientId(e.currentTarget.dataset.id);
              }}
            >
              {names}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MessageSection;
