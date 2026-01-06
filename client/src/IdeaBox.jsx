import React from "react";

function IdeaBox() {
  return (
    <>
      <form action="">
        <textarea
          name="idea"
          id="idea"
          placeholder="your thoughts goes here...."
          cols="30"
          rows="4"
        ></textarea>
        <br />
        <button>Post</button>
      </form>
    </>
  );
}

export default IdeaBox;
