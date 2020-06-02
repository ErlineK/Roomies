import React, { useContext } from "react";
import { formatDateOnly } from "../../../general/utils/formatHelper";
import { getIconByAction } from "../../Bills/utils/billsHelper";
import "./comment.scss";
import { getIcon } from "../../../general/utils/iconManager";
import { AuthContext } from "../../auth/utils/AuthContext";

function CommentItem({ item }) {
  const { userId } = useContext(AuthContext);

  return (
    <div className="">
      <div className="flex-container flex-between listItemLight">
        <div className="flex-container">
          <div
            className="flex-container flex-between"
            style={{ padding: "0.25rem" }}
          >
            {getIconByAction("comment", "ic ic_md ic_decore ic_margins_hr")}

            <span className="description">
              {formatDateOnly(item.publish_date)}
            </span>
          </div>

          <div>
            <p>
              <span>
                &nbsp; &nbsp;
                <span className="txb">{item.author.name}</span>:{" "}
                <span className="comment">{item.msg}</span>
              </span>
            </p>
          </div>
        </div>
        {item.author._id === userId() &&
          getIcon(
            "delete",
            "Remove comment",
            "ic ic_md ic_alert ic_margins_vr"
          )}
      </div>

      <hr className="separator-light"></hr>
    </div>
  );
}

export default CommentItem;
