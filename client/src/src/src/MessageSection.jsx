import { useEffect } from "react";
import { messageSocket } from "../../socketsFolder/socket";
import { BASEURL } from "../../api/defaultPoint";
import { useState } from "react";

function MessageSection() {
  const [recipientId, setRecipientId] = useState();

  useEffect(() => {
    messageSocket.on("connect", () => {
      console.log(messageSocket.id);
    });

    return () => {
      messageSocket.off("message");
      messageSocket.off("connect");
    };
  }, []);
  console.log(recipientId);
  return (
    <div>
      <UserList setRecipientId={setRecipientId} />
      <section className="discussion-section">
        <p className="sender">sending love to you</p>
        <p className="receiver">Thanks</p>
      </section>
      {recipientId && (
        <section className="sending-section">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="message goes here"
          />
          <button>Send</button>
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
