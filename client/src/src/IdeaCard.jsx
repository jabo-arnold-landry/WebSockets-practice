import React from "react";

function IdeaCard(post) {
  return (
    <>
      <section className="user-info">
        <strong>{post.names}</strong>
        <p>{post.email}</p>
      </section>
      <main>
        <p className="idea">{post.postContents}</p>
      </main>
      <div className="controllers">
        <button>comment</button>
        <button>view profile</button>
        <button>message</button>
      </div>
    </>
  );
}

export default IdeaCard;
