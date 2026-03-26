import React from "react";
import { Link } from "react-router-dom";
import Button from "./src/UIcomponent/Button";

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
        <Button onClick={() => alert("hello")}>comment</Button>
        <Button>like</Button>
        <Button>message</Button>
      </div>
    </>
  );
}

export default IdeaCard;
