export default function CommentsFile({ comments }) {
  return (
    <>
      {comments.map((comment, index) => {
        return <p key={index}>{comment}</p>;
      })}
    </>
  );
}
