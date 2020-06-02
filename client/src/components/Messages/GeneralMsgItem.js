import React from "react";
import { getIcon } from "../../general/utils/iconManager";
import { formatDate } from "../../general/utils/formatHelper";

// TODO: on reply button click -> open quick reply module

function GeneralMsgItem({ item }) {
  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        {getIcon("messages", undefined, "ic_list_item")}
        <div style={{ width: "100%" }}>
          <div className="msgRow lhShort">
            <p className="description">
              <span className="txb">{item.author}</span> sais:
            </p>
            <p className="description textLight">{formatDate(item.date)}</p>
          </div>
          <p className="lhShort">{item.msg}</p>
        </div>
      </div>
      <div className="msgBtn msgBtnBack">
        {getIcon("reply", "Reply", "msgBtnIcon")}
      </div>
      <hr></hr>
    </div>
  );
}

export default GeneralMsgItem;
