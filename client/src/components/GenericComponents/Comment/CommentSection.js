import React from "react";
import CommentItem from "./CommentItem";

function CommentSection({ comments, type }) {
  console.log(comments);

  const commentItems =
    comments &&
    comments.map((comment) => <CommentItem key={comment._id} item={comment} />);

  const firstComment = comments && (
    <CommentItem key={comments[0]._id} item={comments[0]} />
  );

  const displayComment = type === "PREV" ? firstComment : commentItems;

  return (
    <div>
      {comments ? <div className="commentSection">{displayComment}</div> : ""}
    </div>
  );
}

export default CommentSection;
