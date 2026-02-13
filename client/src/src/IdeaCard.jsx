import React from "react";
import { Link } from "react-router-dom";

function IdeaCard(post) {
  return (
    <>
      <section className="user-info">
        <Link to="/test">
          <strong>{post.names}</strong>
          <p>{post.email}</p>
        </Link>
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
