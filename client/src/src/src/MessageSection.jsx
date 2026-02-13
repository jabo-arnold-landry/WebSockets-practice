import React from "react";

function MessageSection() {
  return (
    <div>
      <section className="discussion-section">
        <p className="sender">sending love to you</p>
        <p className="receiver">Thanks</p>
      </section>
      <section className="sending-section">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="message goes here"
        />
        <button>Send</button>
      </section>
    </div>
  );
}

export default MessageSection;
