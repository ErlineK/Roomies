import React from "react";
import { formatDate } from "../../general/utils/formatHelper";
import { getIcon } from "../../general/utils/iconManager";

/**
 * types of notifications:
 * general
 * bill paid
 * welcome new tenant
 */

function NofiticationMsgItem({ item }) {
  let messageTxt = "";
  switch (item.ntf_type) {
    case "bill":
      messageTxt = (
        <p>
          <span className="txb">{item.ntf_bill.bill_type}</span> bill has been
          paid
        </p>
      );
      break;

    case "welcome":
      messageTxt = (
        <p>
          Welcome{" "}
          <span className="txb">
            {item.from_user ? item.from_user.name : ""}
          </span>{" "}
          to{" "}
          <span className="txb">
            {item.ntf_house ? item.ntf_house.houseName : ""}
          </span>
          !
        </p>
      );
      break;

    default:
      messageTxt = "general message";
      break;
  }

  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        {getIcon("notificationMsg", undefined, "ic_list_item")}
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            {messageTxt}
            <p className="description textLight msgDate">
              {formatDate(item.added_date)}
            </p>
          </div>
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default NofiticationMsgItem;
