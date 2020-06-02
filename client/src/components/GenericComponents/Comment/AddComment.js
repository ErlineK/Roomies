import "./comment.scss";
import React from "react";
import useToggle from "../../../general/hooks/useToggle";
import useInputState from "../../../general/hooks/useInputState";
import { getIcon } from "../../../general/utils/iconManager";

// TODO: handle comment after edit bill

export default function AddComment({ billId }) {
  const [editMode, toggleEditMode] = useToggle(false);
  const [comment, handleCommentChange] = useInputState("", "COMMENT");

  const handleAddComment = (e) => {
    e.preventDefault();

    console.log("adding comment: " + comment);
    toggleEditMode();
  };

  return (
    <div className="flex-container flext-right flex-center-vertical">
      <input
        id="comment"
        type="text"
        name="comment"
        placeholder="Comment..."
        className={`${editMode && "showEdit"} inputEdit form-control`}
        value={comment}
        onChange={handleCommentChange}
      />
      {editMode
        ? getIcon(
            "accept",
            "Add comment",
            "ic ic_lg ic_success ic_light toRight",
            (e) => handleAddComment(e)
          )
        : getIcon("add", "Add comment", "ic ic_lg ic_light toRight", () =>
            toggleEditMode()
          )}
    </div>
  );
}
