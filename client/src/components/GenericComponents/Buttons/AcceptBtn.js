import React from "react";
import { getIcon } from "../../../general/utils/iconManager";

export default function AcceptBtn({ onClick }) {
  return (
    <button
      className="btn btn-grad-green btnAction"
      onClick={(e) => onClick(e)}
    >
      {getIcon("accept", undefined, "accent-icon")}
      Accept
    </button>
  );
}
