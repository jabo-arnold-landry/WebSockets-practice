import { useState, useActionState, useEffect } from "react";
import { messageSocket } from "./socketsFolder/socket";
import { BASEURL } from "./api/defaultPoint";
import socket from "./socketsFolder/socket";

function MessageSection() {
  const [_, action, isPending] = useActionState(sendMessage, "");
  const [recipientId, setRecipientId] = useState();
  let [activeUsers, setActiveUsers] = useState([]);

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
      setActiveUsers((prev) => [...prev, ...res]);
    });

    return () => {
      messageSocket.off("message");
      messageSocket.off("connect");
      socket.off("allofus");
    };
  }, []);
  console.log(activeUsers);
  return (
    <div>
      <UserList setRecipientId={setRecipientId} activeUsers={activeUsers} />

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

function UserList({ setRecipientId, activeUsers }) {
  // const [users, setUserList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const userList = async () => {
  //     try {
  //       setIsLoading(true);
  //       const serverResponse = await fetch(`${BASEURL}/myusers`, {
  //         signal: abortController.signal,
  //       });
  //       const users = await serverResponse.json();
  //       setUserList(users);
  //     } catch (err) {
  //       console.log("something bad happened: ", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   userList();
  // }, []);
  return (
    <>
      {/* <p>{isLoading && "Loading users...."}</p> */}
      <ul>
        {activeUsers.map((user) => {
          const { id } = user;
          return (
            <li
              key={id}
              data-id={id}
              onClick={(e) => {
                setRecipientId(e.currentTarget.dataset.id);
              }}
            >
              {id}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MessageSection;
